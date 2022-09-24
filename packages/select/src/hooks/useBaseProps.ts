import { createContext, useContext } from 'react'
import type { BaseSelectProps } from '../BaseSelect'

export interface BaseSelectContextProps extends BaseSelectProps {
  triggerOpen: boolean
  multiple: boolean
  toggleOpen: (open?: boolean) => void
}

export const BaseSelectContext = createContext<BaseSelectContextProps>(null)

export default function useBaseProps() {
  return useContext(BaseSelectContext)
}
