import {
  useMemo, useRef,
  useImperativeHandle, forwardRef,
} from 'react'
import type {
  ReactElement, CSSProperties,
  ForwardRefRenderFunction,
} from 'react'
import Trigger from 'rc-trigger'
import type { AlignType } from 'rc-trigger/lib/interface'
import classNames from 'classnames'
import type { Placement, RenderDOMFunc } from './BaseSelect'

const getBuiltInPlacements = (dropdownMatchSelectWidth: number | boolean) => {
  // Enable horizontal overflow auto-adjustment when a custom dropdown width is provided
  const adjustX = dropdownMatchSelectWidth === true ? 0 : 1
  return {
    bottomLeft: {
      points: ['tl', 'bl'],
      offset: [0, 4],
      overflow: {
        adjustX,
        adjustY: 1,
      },
    },
    bottomRight: {
      points: ['tr', 'br'],
      offset: [0, 4],
      overflow: {
        adjustX,
        adjustY: 1,
      },
    },
    topLeft: {
      points: ['bl', 'tl'],
      offset: [0, -4],
      overflow: {
        adjustX,
        adjustY: 1,
      },
    },
    topRight: {
      points: ['br', 'tr'],
      offset: [0, -4],
      overflow: {
        adjustX,
        adjustY: 1,
      },
    },
  }
}

export interface RefTriggerProps {
  getPopupElement: () => HTMLDivElement
}

export interface SelectTriggerProps {
  prefixCls: string
  children: ReactElement
  disabled: boolean
  visible: boolean
  popupElement: ReactElement

  animation?: string
  transitionName?: string
  containerWidth: number
  placement?: Placement
  dropdownStyle: CSSProperties
  dropdownClassName: string
  dropdownMatchSelectWidth?: boolean | number
  dropdownRender?: (menu: ReactElement) => ReactElement
  getPopupContainer?: RenderDOMFunc
  dropdownAlign: AlignType
  empty: boolean

  getTriggerDOMNode: () => HTMLElement
  onPopupVisibleChange?: (visible: boolean) => void

  onPopupMouseEnter: () => void
}

const SelectTrigger: ForwardRefRenderFunction<RefTriggerProps, SelectTriggerProps> = (
  props,
  ref,
) => {
  const {
    prefixCls,
    disabled,
    visible,
    children,
    popupElement,
    containerWidth,
    animation,
    transitionName,
    dropdownStyle,
    dropdownClassName,
    placement,
    dropdownMatchSelectWidth,
    dropdownRender,
    dropdownAlign,
    getPopupContainer,
    empty,
    getTriggerDOMNode,
    onPopupVisibleChange,
    onPopupMouseEnter,
    ...restProps
  } = props

  const dropdownPrefixCls = `${prefixCls}-dropdown`

  let popupNode = popupElement
  if (dropdownRender) {
    popupNode = dropdownRender(popupElement)
  }

  const builtInPlacements = useMemo(
    () => getBuiltInPlacements(dropdownMatchSelectWidth),
    [dropdownMatchSelectWidth],
  )

  // ===================== Motion ======================
  const mergedTransitionName = animation ? `${dropdownPrefixCls}-${animation}` : transitionName

  // ======================= Ref =======================
  const popupRef = useRef<HTMLDivElement>(null)

  useImperativeHandle(ref, () => ({
    getPopupElement: () => popupRef.current,
  }))

  const popupStyle: CSSProperties = {
    minWidth: containerWidth,
    ...dropdownStyle,
  }

  if (typeof dropdownMatchSelectWidth === 'number') {
    popupStyle.width = dropdownMatchSelectWidth
  } else if (dropdownMatchSelectWidth) {
    popupStyle.width = containerWidth
  }

  return (
    <Trigger
      {...restProps}
      showAction={onPopupVisibleChange ? ['click'] : []}
      hideAction={onPopupVisibleChange ? ['click'] : []}
      popupPlacement={placement || 'bottomLeft'}
      builtinPlacements={builtInPlacements}
      prefixCls={dropdownPrefixCls}
      popupTransitionName={mergedTransitionName}
      popup={
        <div ref={popupRef} onMouseEnter={onPopupMouseEnter}>
          {popupNode}
        </div>
      }
      popupAlign={dropdownAlign}
      popupVisible={visible}
      getPopupContainer={getPopupContainer}
      popupClassName={classNames(dropdownClassName, {
        [`${dropdownPrefixCls}-empty`]: empty,
      })}
      popupStyle={popupStyle}
      getTriggerDOMNode={getTriggerDOMNode}
      onPopupVisibleChange={onPopupVisibleChange}
    >
      {children}
    </Trigger>
  )
}

const RefSelectTrigger = forwardRef<RefTriggerProps, SelectTriggerProps>(SelectTrigger)
RefSelectTrigger.displayName = 'SelectTrigger'

export default RefSelectTrigger