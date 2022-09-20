import { FocusEvent, CSSProperties, MouseEvent } from 'react'
export interface Props {
  prefixCls?: string
  className?: string
  style?: CSSProperties
  name?: string
  id?: string
  type?: string
  title?: string
  defaultChecked?: number | boolean
  checked?: number | boolean
  disabled?: boolean
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void
  onChange?: (e: Event) => void
  onClick?: (e: MouseEvent<HTMLInputElement>) => void
  tabIndex?: string | number
  readOnly?: boolean
  required?: boolean
  autoFocus?: boolean
  value?: any
}