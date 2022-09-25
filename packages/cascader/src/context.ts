import { createContext } from 'react'
import type { ReactNode, CSSProperties } from 'react'
import type {
  CascaderProps,
  InternalFieldNames,
  DefaultOptionType,
  SingleValueType,
} from './Cascader'

export interface CascaderContextProps {
  options: CascaderProps['options']
  fieldNames: InternalFieldNames
  values: SingleValueType[]
  halfValues: SingleValueType[]
  changeOnSelect?: boolean
  onSelect: (valuePath: SingleValueType) => void
  checkable?: boolean | ReactNode
  searchOptions: DefaultOptionType[]
  dropdownPrefixCls?: string
  loadData?: (selectOptions: DefaultOptionType[]) => void
  expandTrigger?: 'hover' | 'click'
  expandIcon?: ReactNode
  loadingIcon?: ReactNode
  dropdownMenuColumnStyle?: CSSProperties
}

const CascaderContext = createContext<CascaderContextProps>(null)

export default CascaderContext
