import { createContext } from 'react'

export interface DrawerContextProps {
  pushDistance?: number | string
  push: VoidFunction
  pull: VoidFunction
}

const DrawerContext = createContext<DrawerContextProps>(null)

export default DrawerContext
