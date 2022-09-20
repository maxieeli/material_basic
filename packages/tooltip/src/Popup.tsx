import type { ReactNode, CSSProperties } from 'react'
import classNames from 'classnames'

export interface ContentProps {
  prefixCls?: string
  children: (() => ReactNode) | ReactNode
  id?: string
  overlayInnerStyle?: CSSProperties
  arrowContent?: ReactNode
  className?: string
  style?: CSSProperties
  showArrow?: boolean
}

export default function Popup(props: ContentProps) {
  const {
    showArrow, arrowContent,
    children, prefixCls,
    id, overlayInnerStyle,
    className, style,
  } = props

  return (
    <div className={classNames(`${prefixCls}-content`, className)} style={style}>
      {showArrow !== false && (
        <div className={`${prefixCls}-arrow`} key='arrow'>
          {arrowContent}
        </div>
      )}
      <div className={`${prefixCls}-inner`} id={id} role='tooltip' style={overlayInnerStyle}>
        {typeof children === 'function' ? children() : children}
      </div>
    </div>
  )
}
