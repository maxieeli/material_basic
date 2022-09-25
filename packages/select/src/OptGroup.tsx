import type { FC, ReactNode } from 'react'
import type { DefaultOptionType } from './Select'

export interface OptGroupProps extends Omit<DefaultOptionType, 'options'> {
  children?: ReactNode
}

export interface OptionGroupFC extends FC<OptGroupProps> {
  isSelectOptGroup: boolean
}

const OptGroup: OptionGroupFC = () => null
OptGroup.isSelectOptGroup = true

export default OptGroup