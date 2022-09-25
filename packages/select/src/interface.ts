import type { ReactNode, Key } from 'react'
import type { RawValueType } from './BaseSelect'

export interface FlattenOptionData<OptionType> {
  label?: ReactNode
  data: OptionType
  key: Key
  value?: RawValueType
  groupOption?: boolean
  group?: boolean
}
