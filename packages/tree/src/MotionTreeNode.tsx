import type { ForwardRefRenderFunction } from 'react'
import { useEffect, useState, useContext, useRef, forwardRef } from 'react'
import classNames from 'classnames'
import CSSMotion from 'rc-motion'
import TreeNode, { TreeNodeProps } from './TreeNode'
import { FlattenNode } from './interface'
import { getTreeNodeProps, TreeNodeRequiredProps } from './utils/treeUtil'
import { TreeContext } from './contextType'

interface MotionTreeNodeProps extends Omit<TreeNodeProps, 'domRef'> {
  active: boolean
  motion?: any
  motionNodes?: FlattenNode[]
  onMotionStart: () => void
  onMotionEnd: () => void
  motionType?: 'show' | 'hide'

  treeNodeRequiredProps: TreeNodeRequiredProps
}

const MotionTreeNode: ForwardRefRenderFunction<HTMLDivElement, MotionTreeNodeProps> = (
  {
    className,
    style,
    motion,
    motionNodes,
    motionType,
    onMotionStart: onOriginMotionStart,
    onMotionEnd: onOriginMotionEnd,
    active,
    treeNodeRequiredProps,
    ...props
  },
  ref,
) => {
  const [visible, setVisible] = useState(true)
  const { prefixCls } = useContext(TreeContext)

  const motionedRef = useRef(false)

  const onMotionEnd = () => {
    if (!motionedRef.current) {
      onOriginMotionEnd()
    }
    motionedRef.current = true
  }

  useEffect(() => {
    if (motionNodes && motionType === 'hide' && visible) {
      setVisible(false)
    }
  }, [motionNodes])

  useEffect(() => {
    // Trigger motion only when patched
    if (motionNodes) {
      onOriginMotionStart()
    }

    return () => {
      if (motionNodes) {
        onMotionEnd()
      }
    }
  }, [])

  if (motionNodes) {
    return (
      <CSSMotion
        ref={ref}
        visible={visible}
        {...motion}
        motionAppear={motionType === 'show'}
        onAppearEnd={onMotionEnd}
        onLeaveEnd={onMotionEnd}
      >
        {({ className: motionClassName, style: motionStyle }, motionRef) => (
          <div
            ref={motionRef}
            className={classNames(`${prefixCls}-treenode-motion`, motionClassName)}
            style={motionStyle}
          >
            {motionNodes.map((treeNode: FlattenNode) => {
              const {
                data: { ...restProps },
                title,
                key,
                isStart,
                isEnd,
              } = treeNode
              delete restProps.children

              const treeNodeProps = getTreeNodeProps(key, treeNodeRequiredProps)

              return (
                <TreeNode
                  {...(restProps as Omit<typeof restProps, 'children'>)}
                  {...treeNodeProps}
                  title={title}
                  active={active}
                  data={treeNode.data}
                  key={key}
                  isStart={isStart}
                  isEnd={isEnd}
                />
              )
            })}
          </div>
        )}
      </CSSMotion>
    )
  }
  return <TreeNode domRef={ref} className={className} style={style} {...props} active={active} />
}

MotionTreeNode.displayName = 'MotionTreeNode'

const RefMotionTreeNode = forwardRef(MotionTreeNode)

export default RefMotionTreeNode
