import type { ReactNode, FC } from 'react'
import type { DefaultOptionType } from './Select'

export interface OptionProps extends Omit<DefaultOptionType, 'label'> {
  children: ReactNode

  /** Save for customize data */
  [prop: string]: any
}

export interface OptionFC extends FC<OptionProps> {
  isSelectOption: boolean
}

const Option: OptionFC = () => null
Option.isSelectOption = true

export default Option
