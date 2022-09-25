import type {
  CSSProperties, MouseEvent,
  KeyboardEvent, KeyboardEventHandler,
  ReactNode,
} from 'react'
import {
  useRef, useEffect,
  useState, useContext,
  useMemo,
} from 'react'
import classNames from 'classnames'
import CSSMotion from 'rc-motion'
import type { CSSMotionProps } from 'rc-motion'
import DrawerPanel from './Panel'
import type ScrollLocker from 'rc-util/lib/Dom/scrollLocker'
import DrawerContext from './context'
import type { DrawerContextProps } from './context'
import KeyCode from 'rc-util/lib/KeyCode'
import { parseWidthHeight } from './utils'

const sentinelStyle: CSSProperties = {
  width: 0,
  height: 0,
  overflow: 'hidden',
  outline: 'none',
  position: 'absolute',
}

export type Placement = 'left' | 'right' | 'top' | 'bottom'

export interface PushConfig {
  distance?: number | string
}

export interface DrawerPopupProps {
  prefixCls: string
  open?: boolean
  inline?: boolean
  push?: boolean | PushConfig
  forceRender?: boolean
  autoFocus?: boolean
  keyboard?: boolean

  // MISC
  scrollLocker?: ScrollLocker

  // Root
  rootClassName?: string
  rootStyle?: CSSProperties
  zIndex?: number

  // Drawer
  placement?: Placement
  className?: string
  style?: CSSProperties
  children?: ReactNode
  width?: number | string
  height?: number | string
  contentWrapperStyle?: CSSProperties

  // Mask
  mask?: boolean
  maskClosable?: boolean
  maskClassName?: CSSProperties
  maskStyle?: CSSProperties

  // Motion
  motion?: CSSMotionProps | ((placement: Placement) => CSSMotionProps)
  maskMotion?: CSSMotionProps

  // Events
  afterOpenChange?: (open: boolean) => void
  onClose?: (
    event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>,
  ) => void
}

export default function DrawerPopup(props: DrawerPopupProps) {
  const {
    prefixCls,
    open,
    placement,
    inline,
    push,
    forceRender,
    autoFocus,
    keyboard,

    // MISC
    scrollLocker,

    // Root
    rootClassName,
    rootStyle,
    zIndex,

    // Drawer
    className,
    style,
    motion,
    width,
    height,
    children,
    contentWrapperStyle,

    // Mask
    mask,
    maskClosable,
    maskMotion,
    maskClassName,
    maskStyle,

    // Events
    afterOpenChange,
    onClose,
  } = props

  // ================================ Refs ================================
  const panelRef = useRef<HTMLDivElement>()
  const sentinelStartRef = useRef<HTMLDivElement>()
  const sentinelEndRef = useRef<HTMLDivElement>()

  const onPanelKeyDown: KeyboardEventHandler<HTMLDivElement> = event => {
    const { keyCode, shiftKey } = event

    switch (keyCode) {
      // Tab active
      case KeyCode.TAB: {
        if (keyCode === KeyCode.TAB) {
          if (!shiftKey && document.activeElement === sentinelEndRef.current) {
            sentinelStartRef.current?.focus({ preventScroll: true })
          } else if (
            shiftKey &&
            document.activeElement === sentinelStartRef.current
          ) {
            sentinelEndRef.current?.focus({ preventScroll: true })
          }
        }
        break
      }

      // Close
      case KeyCode.ESC: {
        if (onClose && keyboard) {
          onClose(event)
        }
        break
      }
    }
  }

  // ========================== Control ===========================
  // Auto Focus
  useEffect(() => {
    if (open && autoFocus) {
      panelRef.current?.focus({ preventScroll: true })
    }
  }, [open, autoFocus])

  // ============================ Push ============================
  const [pushed, setPushed] = useState(false)

  const parentContext = useContext(DrawerContext)

  // Merge push distance
  let pushConfig: PushConfig
  if (push === false) {
    pushConfig = {
      distance: 0,
    }
  } else if (push === true) {
    pushConfig = {}
  } else {
    pushConfig = push || {}
  }
  const pushDistance =
    pushConfig?.distance ?? parentContext?.pushDistance ?? 180

  const mergedContext = useMemo<DrawerContextProps>(
    () => ({
      pushDistance,
      push: () => {
        setPushed(true)
      },
      pull: () => {
        setPushed(false)
      },
    }),
    [pushDistance],
  )

  // ========================= ScrollLock =========================
  // Tell parent to push
  useEffect(() => {
    if (open) {
      parentContext?.push?.()
    } else {
      parentContext?.pull?.()
    }
  }, [open])

  // Lock window scroll
  useEffect(() => {
    if (open && mask) {
      scrollLocker?.lock()
    }
  }, [open, mask])

  // Clean up
  useEffect(
    () => () => {
      scrollLocker?.unLock()
      parentContext?.pull?.()
    },
    [],
  )

  // ============================ Mask ============================
  const maskNode: ReactNode = mask && (
    <CSSMotion key="mask" {...maskMotion} visible={open}>
      {(
        { className: motionMaskClassName, style: motionMaskStyle },
        maskRef,
      ) => {
        return (
          <div
            className={classNames(
              `${prefixCls}-mask`,
              motionMaskClassName,
              maskClassName,
            )}
            style={{
              ...motionMaskStyle,
              ...maskStyle,
            }}
            onClick={maskClosable ? onClose : undefined}
            ref={maskRef}
          />
        )
      }}
    </CSSMotion>
  )

  // =========================== Panel ============================
  const motionProps = typeof motion === 'function' ? motion(placement) : motion

  const wrapperStyle: CSSProperties = {}

  if (pushed && pushDistance) {
    switch (placement) {
      case 'top':
        wrapperStyle.transform = `translateY(${pushDistance}px)`
        break
      case 'bottom':
        wrapperStyle.transform = `translateY(${-pushDistance}px)`
        break
      case 'left':
        wrapperStyle.transform = `translateX(${pushDistance}px)`

        break
      default:
        wrapperStyle.transform = `translateX(${-pushDistance}px)`
        break
    }
  }

  if (placement === 'left' || placement === 'right') {
    wrapperStyle.width = parseWidthHeight(width)
  } else {
    wrapperStyle.height = parseWidthHeight(height)
  }

  const panelNode: ReactNode = (
    <CSSMotion
      key="panel"
      {...motionProps}
      visible={open}
      forceRender={forceRender}
      onVisibleChanged={nextVisible => {
        afterOpenChange?.(nextVisible)
        if (!nextVisible) {
          scrollLocker?.unLock()
        }
      }}
      removeOnLeave={false}
      leavedClassName={`${prefixCls}-content-wrapper-hidden`}
    >
      {({ className: motionClassName, style: motionStyle }, motionRef) => {
        return (
          <div
            className={classNames(
              `${prefixCls}-content-wrapper`,
              motionClassName,
            )}
            style={{
              ...wrapperStyle,
              ...motionStyle,
              ...contentWrapperStyle,
            }}
          >
            <DrawerPanel
              containerRef={motionRef}
              prefixCls={prefixCls}
              className={className}
              style={style}
            >
              {children}
            </DrawerPanel>
          </div>
        )
      }}
    </CSSMotion>
  )

  // =========================== Render ===========================
  const containerStyle: CSSProperties = {
    ...rootStyle,
  }

  if (zIndex) {
    containerStyle.zIndex = zIndex
  }

  return (
    <DrawerContext.Provider value={mergedContext}>
      <div
        className={classNames(
          prefixCls,
          `${prefixCls}-${placement}`,
          rootClassName,
          {
            [`${prefixCls}-open`]: open,
            [`${prefixCls}-inline`]: inline,
          },
        )}
        style={containerStyle}
        tabIndex={-1}
        ref={panelRef}
        onKeyDown={onPanelKeyDown}
      >
        {maskNode}
        <div
          tabIndex={0}
          ref={sentinelStartRef}
          style={sentinelStyle}
          aria-hidden='true'
          data-sentinel='start'
        />
        {panelNode}
        <div
          tabIndex={0}
          ref={sentinelEndRef}
          style={sentinelStyle}
          aria-hidden='true'
          data-sentinel='end'
        />
      </div>
    </DrawerContext.Provider>
  )
}