import type { ReactNode, CSSProperties, ReactElement } from 'react'
import { useRef, useImperativeHandle, forwardRef } from 'react'
import Trigger from 'rc-trigger'
import type { TriggerProps } from 'rc-trigger'
import type { AlignType, ActionType } from 'rc-trigger/lib/interface'
import { placements } from './placements'
import Popup from './Popup'

export interface TooltipProps extends Pick<TriggerProps, 'onPopupAlign' | 'builtinPlacements'> {
  trigger?: ActionType | ActionType[]
  defaultVisible?: boolean
  visible?: boolean
  placement?: string
  /** Config popup motion */
  motion?: TriggerProps['popupMotion']
  onVisibleChange?: (visible: boolean) => void
  afterVisibleChange?: (visible: boolean) => void
  overlay: (() => ReactNode) | ReactNode
  overlayStyle?: CSSProperties
  overlayClassName?: string
  prefixCls?: string
  mouseEnterDelay?: number
  mouseLeaveDelay?: number
  getTooltipContainer?: (node: HTMLElement) => HTMLElement
  destroyTooltipOnHide?:
    | boolean
    | {
        keepParent?: boolean
      }
  align?: AlignType
  showArrow?: boolean
  arrowContent?: ReactNode
  id?: string
  children?: ReactElement
  popupVisible?: boolean
  overlayInnerStyle?: CSSProperties
  zIndex?: number
}

const Tooltip = (props: TooltipProps, ref) => {
  const {
    overlayClassName,
    trigger = ['hover'],
    mouseEnterDelay = 0,
    mouseLeaveDelay = 0.1,
    overlayStyle,
    prefixCls = 'basic-tooltip',
    children,
    onVisibleChange,
    afterVisibleChange,
    motion,
    placement = 'right',
    align = {},
    destroyTooltipOnHide = false,
    defaultVisible,
    getTooltipContainer,
    overlayInnerStyle,
    arrowContent,
    overlay,
    id,
    showArrow,
    ...restProps
  } = props

  const domRef = useRef(null)
  useImperativeHandle(ref, () => domRef.current)

  const extraProps = { ...restProps }
  if ('visible' in props) {
    extraProps.popupVisible = props.visible
  }

  const getPopupElement = () => (
    <Popup
      showArrow={showArrow}
      arrowContent={arrowContent}
      key='content'
      prefixCls={prefixCls}
      id={id}
      overlayInnerStyle={overlayInnerStyle}
    >
      {overlay}
    </Popup>
  )

  let destroyTooltip = false
  let autoDestroy = false
  if (typeof destroyTooltipOnHide === 'boolean') {
    destroyTooltip = destroyTooltipOnHide
  } else if (destroyTooltipOnHide && typeof destroyTooltipOnHide === 'object') {
    const { keepParent } = destroyTooltipOnHide
    destroyTooltip = keepParent === true
    autoDestroy = keepParent === false
  }

  return (
    <Trigger
      popupClassName={overlayClassName}
      prefixCls={prefixCls}
      popup={getPopupElement}
      action={trigger}
      builtinPlacements={placements}
      popupPlacement={placement}
      ref={domRef}
      popupAlign={align}
      getPopupContainer={getTooltipContainer}
      onPopupVisibleChange={onVisibleChange}
      afterPopupVisibleChange={afterVisibleChange}
      popupMotion={motion}
      defaultPopupVisible={defaultVisible}
      destroyPopupOnHide={destroyTooltip}
      autoDestroy={autoDestroy}
      mouseLeaveDelay={mouseLeaveDelay}
      popupStyle={overlayStyle}
      mouseEnterDelay={mouseEnterDelay}
      {...extraProps}
    >
      {children}
    </Trigger>
  )
}

export default forwardRef(Tooltip)
