import classNames from 'classnames'
import ResizeObserver from 'rc-resize-observer'
import isVisible from 'rc-util/lib/Dom/isVisible'
import { isStyleSupport } from 'rc-util/lib/Dom/styleChecker'
import { getTargetScrollBarSize } from 'rc-util/lib/getScrollBarSize'
import pickAttrs from 'rc-util/lib/pickAttrs'
import * as React from 'react'
import shallowEqual from 'shallowequal'
import Body from './Body'
import ColGroup from './ColGroup'
import { EXPAND_COLUMN } from './constant'
import BodyContext from './context/BodyContext'
import ExpandedRowContext from './context/ExpandedRowContext'
import ResizeContext from './context/ResizeContext'
import StickyContext from './context/StickyContext'
import TableContext from './context/TableContext'
import FixedHolder from './FixedHolder'
import Footer, { FooterComponents } from './Footer'
import type { SummaryProps } from './Footer/Summary'
import Summary from './Footer/Summary'
import Header from './Header/Header'
import useColumns from './hooks/useColumns'
import { useLayoutState, useTimeoutLock } from './hooks/useFrame'
import useSticky from './hooks/useSticky'
import useStickyOffsets from './hooks/useStickyOffsets'
import type {
  ColumnsType,
  ColumnType,
  CustomizeComponent,
  CustomizeScrollBody,
  DefaultRecordType,
  ExpandableConfig,
  ExpandableType,
  GetComponent,
  GetComponentProps,
  GetRowKey,
  Key,
  LegacyExpandableProps,
  PanelRender,
  RowClassName,
  TableComponents,
  TableLayout,
  TableSticky,
  TriggerEventHandler,
} from './interface'
import Panel from './Panel'
import StickyScrollBar from './stickyScrollBar'
import { findAllChildrenKeys, renderExpandIcon } from './utils/expandUtil'
import { getCellFixedInfo } from './utils/fixUtil'
import { getExpandableProps } from './utils/legacyUtil'
import { getColumnsKey, getPathValue, validateValue } from './utils/valueUtil'

// Used for conditions cache
const EMPTY_DATA = [] as any[]
// Used for customize scroll
const EMPTY_SCROLL_TARGET = {}

export const INTERNAL_HOOKS = 'basic-table-internal-hook'

interface MemoTableContentProps {
  children: React.ReactNode
  pingLeft: boolean
  pingRight: boolean
  props: any
}

const MemoTableContent = React.memo<MemoTableContentProps>(
  ({ children }) => children as React.ReactElement,

  (prev, next) => {
    if (!shallowEqual(prev.props, next.props)) {
      return false
    }

    // No additional render when pinged status change.
    // This is not a bug.
    return prev.pingLeft !== next.pingLeft || prev.pingRight !== next.pingRight
  },
)

export interface TableProps<RecordType = unknown>
  extends Omit<LegacyExpandableProps<RecordType>, 'showExpandColumn'> {
  prefixCls?: string
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
  data?: readonly RecordType[]
  columns?: ColumnsType<RecordType>
  rowKey?: string | GetRowKey<RecordType>
  tableLayout?: TableLayout

  // Fixed Columns
  scroll?: { x?: number | true | string; y?: number | string }

  // Expandable
  /** Config expand rows */
  expandable?: ExpandableConfig<RecordType>
  indentSize?: number
  rowClassName?: string | RowClassName<RecordType>

  // Additional Part
  footer?: PanelRender<RecordType>
  summary?: (data: readonly RecordType[]) => React.ReactNode
  caption?: string | React.ReactNode

  // Customize
  id?: string
  showHeader?: boolean
  components?: TableComponents<RecordType>
  onRow?: GetComponentProps<RecordType>
  onHeaderRow?: GetComponentProps<readonly ColumnType<RecordType>[]>
  emptyText?: React.ReactNode | (() => React.ReactNode)

  // =================================== Internal ===================================
  /** @private Internal usage */
  internalHooks?: string

  /** @private Internal usage */
  transformColumns?: (columns: ColumnsType<RecordType>) => ColumnsType<RecordType>

  /** @private Internal usage */
  internalRefs?: {
    body: React.MutableRefObject<HTMLDivElement>
  }
  sticky?: boolean | TableSticky
}

function Table<RecordType extends DefaultRecordType>(props: TableProps<RecordType>) {
  const {
    prefixCls,
    className,
    rowClassName,
    style,
    data,
    rowKey,
    scroll,
    tableLayout,
    // Additional Part
    title,
    footer,
    summary,
    caption,

    // Customize
    id,
    showHeader,
    components,
    emptyText,
    onRow,
    onHeaderRow,

    // Internal
    internalHooks,
    transformColumns,
    internalRefs,

    sticky,
  } = props

  const mergedData = data || EMPTY_DATA
  const hasData = !!mergedData.length

  // ==================== Customize =====================
  const getComponent = React.useCallback<GetComponent>(
    (path, defaultComponent) =>
      getPathValue<CustomizeComponent, TableComponents<RecordType>>(components || {}, path) ||
      defaultComponent,
    [components],
  )

  const getRowKey = React.useMemo<GetRowKey<RecordType>>(() => {
    if (typeof rowKey === 'function') {
      return rowKey
    }
    return (record: RecordType) => {
      const key = record && record[rowKey]
      return key
    }
  }, [rowKey])

  // ====================== Expand ======================
  const expandableConfig = getExpandableProps(props)

  const {
    expandIcon,
    expandedRowKeys,
    defaultExpandedRowKeys,
    defaultExpandAllRows,
    expandedRowRender,
    columnTitle,
    onExpand,
    onExpandedRowsChange,
    expandRowByClick,
    rowExpandable,
    expandIconColumnIndex,
    expandedRowClassName,
    childrenColumnName,
    indentSize,
  } = expandableConfig

  const mergedExpandIcon = expandIcon || renderExpandIcon
  const mergedChildrenColumnName = childrenColumnName || 'children'
  const expandableType = React.useMemo<ExpandableType>(() => {
    if (expandedRowRender) {
      return 'row'
    }
    /* eslint-disable no-underscore-dangle */
    if (
      (props.expandable &&
        internalHooks === INTERNAL_HOOKS &&
        (props.expandable as any).__PARENT_RENDER_ICON__) ||
      mergedData.some(
        record => record && typeof record === 'object' && record[mergedChildrenColumnName],
      )
    ) {
      return 'nest'
    }
    /* eslint-enable */
    return false
  }, [!!expandedRowRender, mergedData])

  const [innerExpandedKeys, setInnerExpandedKeys] = React.useState(() => {
    if (defaultExpandedRowKeys) {
      return defaultExpandedRowKeys
    }
    if (defaultExpandAllRows) {
      return findAllChildrenKeys<RecordType>(mergedData, getRowKey, mergedChildrenColumnName)
    }
    return []
  })
  const mergedExpandedKeys = React.useMemo(
    () => new Set(expandedRowKeys || innerExpandedKeys || []),
    [expandedRowKeys, innerExpandedKeys],
  )

  const onTriggerExpand: TriggerEventHandler<RecordType> = React.useCallback(
    (record: RecordType) => {
      const key = getRowKey(record, mergedData.indexOf(record))

      let newExpandedKeys: Key[]
      const hasKey = mergedExpandedKeys.has(key)
      if (hasKey) {
        mergedExpandedKeys.delete(key)
        newExpandedKeys = [...mergedExpandedKeys]
      } else {
        newExpandedKeys = [...mergedExpandedKeys, key]
      }

      setInnerExpandedKeys(newExpandedKeys)
      if (onExpand) {
        onExpand(!hasKey, record)
      }
      if (onExpandedRowsChange) {
        onExpandedRowsChange(newExpandedKeys)
      }
    },
    [getRowKey, mergedExpandedKeys, mergedData, onExpand, onExpandedRowsChange],
  )

  // ====================== Column ======================
  const [componentWidth, setComponentWidth] = React.useState(0)

  const [columns, flattenColumns] = useColumns(
    {
      ...props,
      ...expandableConfig,
      expandable: !!expandedRowRender,
      columnTitle: columnTitle,
      expandedKeys: mergedExpandedKeys,
      getRowKey,
      onTriggerExpand,
      expandIcon: mergedExpandIcon,
      expandIconColumnIndex,
    },
    internalHooks === INTERNAL_HOOKS ? transformColumns : null,
  )

  const columnContext = React.useMemo(
    () => ({
      columns,
      flattenColumns,
    }),
    [columns, flattenColumns],
  )

  // ====================== Scroll ======================
  const fullTableRef = React.useRef<HTMLDivElement>()
  const scrollHeaderRef = React.useRef<HTMLDivElement>()
  const scrollBodyRef = React.useRef<HTMLDivElement>()
  const scrollBodyContainerRef = React.useRef<HTMLDivElement>()
  const scrollSummaryRef = React.useRef<HTMLDivElement>()
  const [pingedLeft, setPingedLeft] = React.useState(false)
  const [pingedRight, setPingedRight] = React.useState(false)
  const [colsWidths, updateColsWidths] = useLayoutState(new Map<React.Key, number>())

  // Convert map to number width
  const colsKeys = getColumnsKey(flattenColumns)
  const pureColWidths = colsKeys.map(columnKey => colsWidths.get(columnKey))
  const colWidths = React.useMemo(() => pureColWidths, [pureColWidths.join('_')])
  const stickyOffsets = useStickyOffsets(colWidths, flattenColumns.length)
  const fixHeader = scroll && validateValue(scroll.y)
  const horizonScroll = (scroll && validateValue(scroll.x)) || Boolean(expandableConfig.fixed)
  const fixColumn = horizonScroll && flattenColumns.some(({ fixed }) => fixed)

  // Sticky
  const stickyRef = React.useRef<{ setScrollLeft: (left: number) => void }>()
  const {
    isSticky, offsetHeader,
    offsetSummary, offsetScroll,
    stickyClassName, container,
  } = useSticky(sticky, prefixCls)

  // Footer (Fix footer must fixed header)
  const summaryNode = summary?.(mergedData)
  const fixFooter =
    (fixHeader || isSticky) &&
    React.isValidElement(summaryNode) &&
    summaryNode.type === Summary &&
    (summaryNode.props as SummaryProps).fixed

  // Scroll
  let scrollXStyle: React.CSSProperties
  let scrollYStyle: React.CSSProperties
  let scrollTableStyle: React.CSSProperties

  if (fixHeader) {
    scrollYStyle = {
      overflowY: 'scroll',
      maxHeight: scroll.y,
    }
  }

  if (horizonScroll) {
    scrollXStyle = { overflowX: 'auto' }
    // When no vertical scrollbar, should hide it
    if (!fixHeader) {
      scrollYStyle = { overflowY: 'hidden' }
    }
    scrollTableStyle = {
      width: scroll?.x === true ? 'auto' : scroll?.x,
      minWidth: '100%',
    }
  }

  const onColumnResize = React.useCallback((columnKey: React.Key, width: number) => {
    if (isVisible(fullTableRef.current)) {
      updateColsWidths(widths => {
        if (widths.get(columnKey) !== width) {
          const newWidths = new Map(widths)
          newWidths.set(columnKey, width)
          return newWidths
        }
        return widths
      })
    }
  }, [])

  const [setScrollTarget, getScrollTarget] = useTimeoutLock(null)

  function forceScroll(scrollLeft: number, target: HTMLDivElement | ((left: number) => void)) {
    if (!target) {
      return
    }
    if (typeof target === 'function') {
      target(scrollLeft)
    } else if (target.scrollLeft !== scrollLeft) {
      target.scrollLeft = scrollLeft

      if (target.scrollLeft !== scrollLeft) {
        setTimeout(() => {
          target.scrollLeft = scrollLeft
        }, 0)
      }
    }
  }

  const onScroll = ({
    currentTarget,
    scrollLeft,
  }: {
    currentTarget: HTMLElement
    scrollLeft?: number
  }) => {
    const mergedScrollLeft = typeof scrollLeft === 'number' ? scrollLeft : currentTarget.scrollLeft

    const compareTarget = currentTarget || EMPTY_SCROLL_TARGET
    if (!getScrollTarget() || getScrollTarget() === compareTarget) {
      setScrollTarget(compareTarget)

      forceScroll(mergedScrollLeft, scrollHeaderRef.current)
      forceScroll(mergedScrollLeft, scrollBodyRef.current)
      forceScroll(mergedScrollLeft, scrollSummaryRef.current)
      forceScroll(mergedScrollLeft, stickyRef.current?.setScrollLeft)
    }

    if (currentTarget) {
      const { scrollWidth, clientWidth } = currentTarget
      // There is no space to scroll
      if (scrollWidth === clientWidth) {
        setPingedLeft(false)
        setPingedRight(false)
        return
      }
      setPingedLeft(mergedScrollLeft > 0)
      setPingedRight(mergedScrollLeft < scrollWidth - clientWidth)
    }
  }

  const triggerOnScroll = () => {
    if (horizonScroll && scrollBodyRef.current) {
      onScroll({ currentTarget: scrollBodyRef.current } as React.UIEvent<HTMLDivElement>)
    } else {
      setPingedLeft(false)
      setPingedRight(false)
    }
  }

  const onFullTableResize = ({ width }: any) => {
    if (width !== componentWidth) {
      triggerOnScroll()
      setComponentWidth(fullTableRef.current ? fullTableRef.current.offsetWidth : width)
    }
  }

  // Sync scroll bar when init or `horizonScroll`, `data` and `columns.length` changed
  const mounted = React.useRef(false)
  React.useEffect(() => {
    // onFullTableResize will be trigger once when ResizeObserver is mounted
    // This will reduce one duplicated triggerOnScroll time
    if (mounted.current) {
      triggerOnScroll()
    }
  }, [horizonScroll, data, columns.length])
  React.useEffect(() => {
    mounted.current = true
  }, [])

  // ===================== Effects ======================
  const [scrollbarSize, setScrollbarSize] = React.useState(0)
  const [supportSticky, setSupportSticky] = React.useState(true) // Only IE not support, we mark as support first

  React.useEffect(() => {
    if (scrollBodyRef.current instanceof Element) {
      setScrollbarSize(getTargetScrollBarSize(scrollBodyRef.current).width)
    } else {
      setScrollbarSize(getTargetScrollBarSize(scrollBodyContainerRef.current).width)
    }
    setSupportSticky(isStyleSupport('position', 'sticky'))
  }, [])

  // ================== INTERNAL HOOKS ==================
  React.useEffect(() => {
    if (internalHooks === INTERNAL_HOOKS && internalRefs) {
      internalRefs.body.current = scrollBodyRef.current
    }
  })

  // ====================== Render ======================
  const TableComponent = getComponent(['table'], 'table')

  // Table layout
  const mergedTableLayout = React.useMemo<TableLayout>(() => {
    if (tableLayout) {
      return tableLayout
    }
    // When scroll.x is max-content, no need to fix table layout
    // it's width should stretch out to fit content
    if (fixColumn) {
      return scroll?.x === 'max-content' ? 'auto' : 'fixed'
    }
    if (fixHeader || isSticky || flattenColumns.some(({ ellipsis }) => ellipsis)) {
      return 'fixed'
    }
    return 'auto'
  }, [fixHeader, fixColumn, flattenColumns, tableLayout, isSticky])

  let groupTableNode: React.ReactNode

  // Header props
  const headerProps = {
    colWidths,
    columCount: flattenColumns.length,
    stickyOffsets,
    onHeaderRow,
    fixHeader,
    scroll,
  }

  // Empty
  const emptyNode: React.ReactNode = React.useMemo(() => {
    if (hasData) {
      return null
    }

    if (typeof emptyText === 'function') {
      return emptyText()
    }
    return emptyText
  }, [hasData, emptyText])

  // Body
  const bodyTable = (
    <Body
      data={mergedData}
      measureColumnWidth={fixHeader || horizonScroll || isSticky}
      expandedKeys={mergedExpandedKeys}
      rowExpandable={rowExpandable}
      getRowKey={getRowKey}
      onRow={onRow}
      emptyNode={emptyNode}
      childrenColumnName={mergedChildrenColumnName}
    />
  )

  const bodyColGroup = (
    <ColGroup colWidths={flattenColumns.map(({ width }) => width)} columns={flattenColumns} />
  )

  const captionElement =
    caption !== null && caption !== undefined ? (
      <caption className={`${prefixCls}-caption`}>{caption}</caption>
    ) : undefined

  const customizeScrollBody = getComponent(['body']) as CustomizeScrollBody<RecordType>

  if (fixHeader || isSticky) {
    // >>>>>> Fixed Header
    let bodyContent: React.ReactNode

    if (typeof customizeScrollBody === 'function') {
      bodyContent = customizeScrollBody(mergedData, {
        scrollbarSize,
        ref: scrollBodyRef,
        onScroll,
      })

      headerProps.colWidths = flattenColumns.map(({ width }, index) => {
        const colWidth = index === columns.length - 1 ? (width as number) - scrollbarSize : width
        if (typeof colWidth === 'number' && !Number.isNaN(colWidth)) {
          return colWidth
        }
        return 0
      }) as number[]
    } else {
      bodyContent = (
        <div
          style={{
            ...scrollXStyle,
            ...scrollYStyle,
          }}
          onScroll={onScroll}
          ref={scrollBodyRef}
          className={classNames(`${prefixCls}-body`)}
        >
          <TableComponent
            style={{
              ...scrollTableStyle,
              tableLayout: mergedTableLayout,
            }}
          >
            {captionElement}
            {bodyColGroup}
            {bodyTable}
            {!fixFooter && summaryNode && (
              <Footer stickyOffsets={stickyOffsets} flattenColumns={flattenColumns}>
                {summaryNode}
              </Footer>
            )}
          </TableComponent>
        </div>
      )
    }

    // Fixed holder share the props
    const fixedHolderProps = {
      noData: !mergedData.length,
      maxContentScroll: horizonScroll && scroll.x === 'max-content',
      ...headerProps,
      ...columnContext,
      stickyClassName,
      onScroll,
    }

    groupTableNode = (
      <>
        {/* Header Table */}
        {showHeader !== false && (
          <FixedHolder
            {...fixedHolderProps}
            stickyTopOffset={offsetHeader}
            className={`${prefixCls}-header`}
            ref={scrollHeaderRef}
          >
            {fixedHolderPassProps => (
              <>
                <Header {...fixedHolderPassProps} />
                {fixFooter === 'top' && <Footer {...fixedHolderPassProps}>{summaryNode}</Footer>}
              </>
            )}
          </FixedHolder>
        )}

        {/* Body Table */}
        {bodyContent}

        {/* Summary Table */}
        {fixFooter && fixFooter !== 'top' && (
          <FixedHolder
            {...fixedHolderProps}
            stickyBottomOffset={offsetSummary}
            className={`${prefixCls}-summary`}
            ref={scrollSummaryRef}
          >
            {fixedHolderPassProps => <Footer {...fixedHolderPassProps}>{summaryNode}</Footer>}
          </FixedHolder>
        )}

        {isSticky && (
          <StickyScrollBar
            ref={stickyRef}
            offsetScroll={offsetScroll}
            scrollBodyRef={scrollBodyRef}
            onScroll={onScroll}
            container={container}
          />
        )}
      </>
    )
  } else {
    // >>>>>> Unique table
    groupTableNode = (
      <div
        style={{
          ...scrollXStyle,
          ...scrollYStyle,
        }}
        className={classNames(`${prefixCls}-content`)}
        onScroll={onScroll}
        ref={scrollBodyRef}
      >
        <TableComponent style={{ ...scrollTableStyle, tableLayout: mergedTableLayout }}>
          {captionElement}
          {bodyColGroup}
          {showHeader !== false && <Header {...headerProps} {...columnContext} />}
          {bodyTable}
          {summaryNode && (
            <Footer stickyOffsets={stickyOffsets} flattenColumns={flattenColumns}>
              {summaryNode}
            </Footer>
          )}
        </TableComponent>
      </div>
    )
  }

  const ariaProps = pickAttrs(props, { aria: true, data: true })

  let fullTable = (
    <div
      className={classNames(prefixCls, className, {
        [`${prefixCls}-ping-left`]: pingedLeft,
        [`${prefixCls}-ping-right`]: pingedRight,
        [`${prefixCls}-layout-fixed`]: tableLayout === 'fixed',
        [`${prefixCls}-fixed-header`]: fixHeader,
        /** No used but for compatible */
        [`${prefixCls}-fixed-column`]: fixColumn,
        [`${prefixCls}-scroll-horizontal`]: horizonScroll,
        [`${prefixCls}-has-fix-left`]: flattenColumns[0] && flattenColumns[0].fixed,
        [`${prefixCls}-has-fix-right`]:
          flattenColumns[flattenColumns.length - 1] &&
          flattenColumns[flattenColumns.length - 1].fixed === 'right',
      })}
      style={style}
      id={id}
      ref={fullTableRef}
      {...ariaProps}
    >
      <MemoTableContent
        pingLeft={pingedLeft}
        pingRight={pingedRight}
        props={{ ...props, stickyOffsets, mergedExpandedKeys }}
      >
        {title && <Panel className={`${prefixCls}-title`}>{title(mergedData)}</Panel>}
        <div ref={scrollBodyContainerRef} className={`${prefixCls}-container`}>
          {groupTableNode}
        </div>
        {footer && <Panel className={`${prefixCls}-footer`}>{footer(mergedData)}</Panel>}
      </MemoTableContent>
    </div>
  )

  if (horizonScroll) {
    fullTable = <ResizeObserver onResize={onFullTableResize}>{fullTable}</ResizeObserver>
  }

  const TableContextValue = React.useMemo(
    () => ({
      prefixCls,
      getComponent,
      scrollbarSize,
      fixedInfoList: flattenColumns.map((_, colIndex) =>
        getCellFixedInfo(colIndex, colIndex, flattenColumns, stickyOffsets),
      ),
      isSticky,
    }),
    [prefixCls, getComponent, scrollbarSize, flattenColumns, stickyOffsets, isSticky],
  )

  const BodyContextValue = React.useMemo(
    () => ({
      ...columnContext,
      tableLayout: mergedTableLayout,
      rowClassName,
      expandedRowClassName,
      expandIcon: mergedExpandIcon,
      expandableType,
      expandRowByClick,
      expandedRowRender,
      onTriggerExpand,
      expandIconColumnIndex,
      indentSize,
      allColumnsFixedLeft: columnContext.flattenColumns.every(col => col.fixed === 'left'),
    }),
    [
      columnContext,
      mergedTableLayout,
      rowClassName,
      expandedRowClassName,
      mergedExpandIcon,
      expandableType,
      expandRowByClick,
      expandedRowRender,
      onTriggerExpand,
      expandIconColumnIndex,
      indentSize,
    ],
  )

  const ExpandedRowContextValue = React.useMemo(
    () => ({
      componentWidth,
      fixHeader,
      fixColumn,
      horizonScroll,
    }),
    [componentWidth, fixHeader, fixColumn, horizonScroll],
  )

  const ResizeContextValue = React.useMemo(() => ({ onColumnResize }), [onColumnResize])

  return (
    <StickyContext.Provider value={supportSticky}>
      <TableContext.Provider value={TableContextValue}>
        <BodyContext.Provider value={BodyContextValue}>
          <ExpandedRowContext.Provider value={ExpandedRowContextValue}>
            <ResizeContext.Provider value={ResizeContextValue}>{fullTable}</ResizeContext.Provider>
          </ExpandedRowContext.Provider>
        </BodyContext.Provider>
      </TableContext.Provider>
    </StickyContext.Provider>
  )
}

Table.EXPAND_COLUMN = EXPAND_COLUMN
Table.Summary = FooterComponents

Table.defaultProps = {
  rowKey: 'key',
  prefixCls: 'basic-table',
  emptyText: () => 'No Data',
}

export default Table
