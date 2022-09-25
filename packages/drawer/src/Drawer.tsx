import { FC, useState } from 'react'
import type { MouseEvent, KeyboardEvent } from 'react'
import type { GetContainer } from 'rc-util/lib/PortalWrapper'
import Portal from 'rc-util/lib/PortalWrapper'
import DrawerPopup from './Popup'
import type { DrawerPopupProps } from './Popup'

export type Placement = 'left' | 'top' | 'right' | 'bottom'

export interface DrawerProps extends Omit<DrawerPopupProps, 'prefixCls' | 'inline' | 'scrollLocker'> {
  prefixCls?: string
  open?: boolean
  onClose?: (e: MouseEvent | KeyboardEvent) => void
  destroyOnClose?: boolean
  getContainer?: GetContainer | false
}

const defaultGetContainer = () => document.body

const Drawer: FC<DrawerProps> = props => {
  const {
    open,
    getContainer,
    forceRender,
    prefixCls,
    afterOpenChange,
    destroyOnClose,
  } = props

  const [animatedVisible, setAnimatedVisible] = useState(false)
  const internalAfterOpenChange: DrawerProps['afterOpenChange'] =
    nextVisible => {
    setAnimatedVisible(nextVisible)
    afterOpenChange?.(nextVisible)
  }

  if (!forceRender && !animatedVisible && !open && destroyOnClose) {
    return null
  }

  const sharedDrawerProps = {
    ...props,
    prefixCls,
    afterOpenChange: internalAfterOpenChange,
  }

  if (getContainer === false) {
    return <DrawerPopup {...sharedDrawerProps} inline />
  }

  return (
    <Portal
      visible={open}
      forceRender={forceRender}
      getContainer={getContainer}
    >
      {({ scrollLocker }) => (
        <DrawerPopup {...sharedDrawerProps} scrollLocker={scrollLocker} />
      )}
    </Portal>
  )
}

Drawer.defaultProps = {
  open: false,
  getContainer: defaultGetContainer,
  prefixCls: 'basic-drawer',
  placement: 'right',
  autoFocus: true,
  keyboard: true,
  width: 378,
  mask: true,
  maskClosable: true,
}

Drawer.displayName = 'Drawer'
export default Drawer
