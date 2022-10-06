import * as React from 'react'
import toArray from 'rc-util/lib/Children/toArray'
import type {
  ColumnsType,
  ColumnType,
  FixedType,
  Key,
  GetRowKey,
  TriggerEventHandler,
  RenderExpandIcon,
  ColumnGroupType,
} from '../interface'
import { INTERNAL_COL_DEFINE } from '../utils/legacyUtil'
import { EXPAND_COLUMN } from '../constant'

export function convertChildrenToColumns<RecordType>(
  children: React.ReactNode,
): ColumnsType<RecordType> {
  return toArray(children)
    .filter(node => React.isValidElement(node))
    .map(({ key, props }: React.ReactElement) => {
      const { children: nodeChildren, ...restProps } = props
      const column = {
        key,
        ...restProps,
      }

      if (nodeChildren) {
        column.children = convertChildrenToColumns(nodeChildren)
      }

      return column
    })
}

function flatColumns<RecordType>(columns: ColumnsType<RecordType>): ColumnType<RecordType>[] {
  return columns.reduce((list, column) => {
    const { fixed } = column

    // Convert `fixed='true'` to `fixed='left'` instead
    const parsedFixed = fixed === true ? 'left' : fixed

    const subColumns = (column as ColumnGroupType<RecordType>).children
    if (subColumns && subColumns.length > 0) {
      return [
        ...list,
        ...flatColumns(subColumns).map(subColum => ({
          fixed: parsedFixed,
          ...subColum,
        })),
      ]
    }
    return [
      ...list,
      {
        ...column,
        fixed: parsedFixed,
      },
    ]
  }, [])
}

/**
 * Parse `columns` & `children` into `columns`.
 */
function useColumns<RecordType>(
  {
    prefixCls,
    columns,
    children,
    expandable,
    expandedKeys,
    columnTitle,
    getRowKey,
    onTriggerExpand,
    expandIcon,
    rowExpandable,
    expandIconColumnIndex,
    expandRowByClick,
    columnWidth,
    fixed,
  }: {
    prefixCls?: string
    columns?: ColumnsType<RecordType>
    children?: React.ReactNode
    expandable: boolean
    expandedKeys: Set<Key>
    columnTitle?: React.ReactNode
    getRowKey: GetRowKey<RecordType>
    onTriggerExpand: TriggerEventHandler<RecordType>
    expandIcon?: RenderExpandIcon<RecordType>
    rowExpandable?: (record: RecordType) => boolean
    expandIconColumnIndex?: number
    expandRowByClick?: boolean
    columnWidth?: number | string
    fixed?: FixedType
  },
  transformColumns: (columns: ColumnsType<RecordType>) => ColumnsType<RecordType>,
): [ColumnsType<RecordType>, readonly ColumnType<RecordType>[]] {
  const baseColumns = React.useMemo<ColumnsType<RecordType>>(
    () => columns || convertChildrenToColumns(children),
    [columns, children],
  )

  // ========================== Expand ==========================
  const withExpandColumns = React.useMemo<ColumnsType<RecordType>>(() => {
    if (expandable) {
      let cloneColumns = baseColumns.slice()

      // >>> Insert expand column if not exist
      if (!cloneColumns.includes(EXPAND_COLUMN)) {
        const expandColIndex = expandIconColumnIndex || 0
        if (expandColIndex >= 0) {
          cloneColumns.splice(expandColIndex, 0, EXPAND_COLUMN)
        }
      }

      // >>> Deduplicate additional expand column
      const expandColumnIndex = cloneColumns.indexOf(EXPAND_COLUMN)
      cloneColumns = cloneColumns.filter(
        (column, index) => column !== EXPAND_COLUMN || index === expandColumnIndex,
      )

      // >>> Check if expand column need to fixed
      const prevColumn = baseColumns[expandColumnIndex]

      let fixedColumn: FixedType | null
      if ((fixed === 'left' || fixed) && !expandIconColumnIndex) {
        fixedColumn = 'left'
      } else if ((fixed === 'right' || fixed) && expandIconColumnIndex === baseColumns.length) {
        fixedColumn = 'right'
      } else {
        fixedColumn = prevColumn ? prevColumn.fixed : null
      }

      // >>> Create expandable column
      const expandColumn = {
        [INTERNAL_COL_DEFINE]: {
          className: `${prefixCls}-expand-icon-col`,
          columnType: 'EXPAND_COLUMN',
        },
        title: columnTitle,
        fixed: fixedColumn,
        className: `${prefixCls}-row-expand-icon-cell`,
        width: columnWidth,
        // @ts-ignore
        render: (_, record, index) => {
          const rowKey = getRowKey(record, index)
          const expanded = expandedKeys.has(rowKey)
          const recordExpandable = rowExpandable ? rowExpandable(record) : true

          const icon = expandIcon({
            prefixCls,
            expanded,
            expandable: recordExpandable,
            record,
            onExpand: onTriggerExpand,
          })

          if (expandRowByClick) {
            return <span onClick={e => e.stopPropagation()}>{icon}</span>
          }
          return icon
        },
      }

      return cloneColumns.map(col => (col === EXPAND_COLUMN ? expandColumn : col))
    }

    return baseColumns.filter(col => col !== EXPAND_COLUMN)
  }, [expandable, baseColumns, getRowKey, expandedKeys, expandIcon])

  // ========================= Transform ========================
  const mergedColumns = React.useMemo(() => {
    let finalColumns = withExpandColumns
    if (transformColumns) {
      finalColumns = transformColumns(finalColumns)
    }

    // Always provides at least one column for table display
    if (!finalColumns.length) {
      finalColumns = [
        {
          render: () => null,
        },
      ]
    }
    return finalColumns
  }, [transformColumns, withExpandColumns])

  // ========================== Flatten =========================
  const flattenColumns = React.useMemo(() => {
    return flatColumns(mergedColumns)
  }, [mergedColumns])
  return [mergedColumns, flattenColumns]
}

export default useColumns
