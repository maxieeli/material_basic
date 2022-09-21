import type { CSSProperties, ReactNode, Ref } from 'react'
import classNames from 'classnames'

export interface DrawerPanelRef {
  focus: VoidFunction
}

export interface DrawerPanelProps {
  prefixCls: string
  className?: string
  style: CSSProperties
  children?: ReactNode
  containerRef?: Ref<HTMLDivElement>
}

const DrawerPanel = (props: DrawerPanelProps) => {
  const {
    prefixCls, className,
    style, children,
    containerRef,
  } = props
  return (
    <>
      <div
        className={classNames(`${prefixCls}-content`, className)}
        style={{ ...style }}
        aria-modal='true'
        role='dialog'
        ref={containerRef}
      >
        {children}
      </div>
    </>
  )
}

DrawerPanel.displayName = 'DrawerPanel'
export default DrawerPanel
