import { useContext } from 'react'
import type { MouseEventHandler } from 'react'
import classNames from 'classnames'
import CascaderContext from '../context'

export interface CheckboxProps {
  prefixCls: string
  checked?: boolean
  halfChecked?: boolean
  disabled?: boolean
  onClick?: MouseEventHandler
}

export default function Checkbox({
  prefixCls,
  checked,
  halfChecked,
  disabled,
  onClick,
}: CheckboxProps) {
  const { checkable } = useContext(CascaderContext)

  const customCheckbox = typeof checkable !== 'boolean' ? checkable : null

  return (
    <span
      className={classNames(`${prefixCls}`, {
        [`${prefixCls}-checked`]: checked,
        [`${prefixCls}-indeterminate`]: !checked && halfChecked,
        [`${prefixCls}-disabled`]: disabled,
      })}
      onClick={onClick}
    >
      {customCheckbox}
    </span>
  )
}
