import * as React from 'react'
import classNames from 'classnames'
import Overflow from 'rc-overflow'
import KeyCode from 'rc-util/lib/KeyCode'
import omit from 'rc-util/lib/omit'
import type { MenuInfo, MenuItemType } from './interface'
import { MenuContext } from './context/MenuContext'
import useActive from './hooks/useActive'
import Icon from './Icon'
import useDirectionStyle from './hooks/useDirectionStyle'
import { useFullPath, useMeasure } from './context/PathContext'
import { useMenuId } from './context/IdContext'

export interface MenuItemProps
  extends Omit<MenuItemType, 'label' | 'key'>,
    Omit<
      React.HTMLAttributes<HTMLLIElement>,
      'onClick' | 'onMouseEnter' | 'onMouseLeave' | 'onSelect'
    > {
  children?: React.ReactNode

  /** @private Internal filled key. Do not set it directly */
  eventKey?: string

  /** @private Do not use. Private warning empty usage */
  warnKey?: boolean
}

// Since Menu event provide the `info.item` which point to the MenuItem node instance.
// We have to use class component here.
// This should be removed from doc & api in future.
class LegacyMenuItem extends React.Component<any> {
  render() {
    const { title, attribute, elementRef, ...restProps } = this.props
    const passedProps = omit(restProps, ['eventKey'])

    return (
      <Overflow.Item
        {...attribute}
        title={typeof title === 'string' ? title : undefined}
        {...passedProps}
        ref={elementRef}
      />
    )
  }
}

/**
 * Real Menu Item component
 */
const InternalMenuItem = (props: MenuItemProps) => {
  const {
    style,
    className,

    eventKey,
    warnKey,
    disabled,
    itemIcon,
    children,

    // Aria
    role,

    // Active
    onMouseEnter,
    onMouseLeave,

    onClick,
    onKeyDown,

    onFocus,

    ...restProps
  } = props

  const domDataId = useMenuId(eventKey)

  const {
    prefixCls,
    onItemClick,

    disabled: contextDisabled,
    overflowDisabled,

    // Icon
    itemIcon: contextItemIcon,

    // Select
    selectedKeys,

    // Active
    onActive,
  } = React.useContext(MenuContext)

  const itemCls = `${prefixCls}-item`

  const legacyMenuItemRef = React.useRef<any>()
  const elementRef = React.useRef<HTMLLIElement>()
  const mergedDisabled = contextDisabled || disabled
  const connectedKeys = useFullPath(eventKey)

  // ============================= Info =============================
  const getEventInfo = (
    e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
  ): MenuInfo => {
    return {
      key: eventKey,
      keyPath: [...connectedKeys].reverse(),
      domEvent: e,
    }
  }

  // ============================= Icon =============================
  const mergedItemIcon = itemIcon || contextItemIcon

  // ============================ Active ============================
  const { active, ...activeProps } = useActive(
    eventKey,
    mergedDisabled,
    onMouseEnter,
    onMouseLeave,
  )

  // ============================ Select ============================
  const selected = selectedKeys.includes(eventKey)

  // ======================== DirectionStyle ========================
  const directionStyle = useDirectionStyle(connectedKeys.length)

  // ============================ Events ============================
  const onInternalClick: React.MouseEventHandler<HTMLLIElement> = e => {
    if (mergedDisabled) {
      return
    }

    const info = getEventInfo(e)

    onClick?.(info)
    onItemClick(info)
  }

  const onInternalKeyDown: React.KeyboardEventHandler<HTMLLIElement> = e => {
    onKeyDown?.(e)

    if (e.which === KeyCode.ENTER) {
      const info = getEventInfo(e)

      // Legacy. Key will also trigger click event
      onClick?.(info)
      onItemClick(info)
    }
  }

  /**
   * Used for accessibility. Helper will focus element without key board.
   * We should manually trigger an active
   */
  const onInternalFocus: React.FocusEventHandler<HTMLLIElement> = e => {
    onActive(eventKey)
    onFocus?.(e)
  }

  // ============================ Render ============================
  const optionRoleProps: React.HTMLAttributes<HTMLDivElement> = {}

  if (props.role === 'option') {
    optionRoleProps['aria-selected'] = selected
  }

  let renderNode = (
    <LegacyMenuItem
      ref={legacyMenuItemRef}
      elementRef={elementRef}
      role={role === null ? 'none' : role || 'menuitem'}
      tabIndex={disabled ? null : -1}
      data-menu-id={overflowDisabled && domDataId ? null : domDataId}
      {...restProps}
      {...activeProps}
      {...optionRoleProps}
      component="li"
      aria-disabled={disabled}
      style={{
        ...directionStyle,
        ...style,
      }}
      className={classNames(
        itemCls,
        {
          [`${itemCls}-active`]: active,
          [`${itemCls}-selected`]: selected,
          [`${itemCls}-disabled`]: mergedDisabled,
        },
        className,
      )}
      onClick={onInternalClick}
      onKeyDown={onInternalKeyDown}
      onFocus={onInternalFocus}
    >
      {children}
      <Icon
        props={{
          ...props,
          isSelected: selected,
        }}
        icon={mergedItemIcon}
      />
    </LegacyMenuItem>
  )

  return renderNode
}

function MenuItem(props: MenuItemProps): React.ReactElement {
  const { eventKey } = props

  // ==================== Record KeyPath ====================
  const measure = useMeasure()
  const connectedKeyPath = useFullPath(eventKey)

  // eslint-disable-next-line consistent-return
  React.useEffect(() => {
    if (measure) {
      measure.registerPath(eventKey, connectedKeyPath)

      return () => {
        measure.unregisterPath(eventKey, connectedKeyPath)
      }
    }
  }, [connectedKeyPath])

  if (measure) {
    return null
  }

  // ======================== Render ========================
  return <InternalMenuItem {...props} />
}

export default MenuItem
