import type { CSSProperties, ComponentType, ReactNode } from 'react'

export interface PaginationData {
  className: string
  selectPrefixCls: string
  prefixCls: string
  pageSizeOptions: string[] | number[]
  current: number
  defaultCurrent: number
  total: number
  pageSize: number
  defaultPageSize: number
  hideOnSinglePage: boolean
  showSizeChanger: boolean
  showLessItems: boolean
  showPrevNextJumpers: boolean
  showQuickJumper: boolean | object
  showTitle: boolean
  simple: boolean
  disabled: boolean
  locale: PaginationLocale
  style: CSSProperties
  selectComponentClass: ComponentType
  prevIcon: ComponentType | ReactNode
  nextIcon: ComponentType | ReactNode
  jumpPrevIcon: ComponentType | ReactNode
  jumpNextIcon: ComponentType | ReactNode
}

export interface PaginationLocale {
  // Options.jsx
  items_per_page?: string
  jump_to?: string
  jump_to_confirm?: string
  page?: string
  // Pagination.jsx
  prev_page?: string
  next_page?: string
  prev_5?: string
  next_5?: string
  prev_3?: string
  next_3?: string
}

export interface PaginationProps extends Partial<PaginationData> {
  onChange?: (page: number, pageSize: number) => void
  onShowSizeChange?: (current: number, size: number) => void
  itemRender?: (page: number, type: string, element: ReactNode) => ReactNode
  showTotal?: (total: number, range: [number, number]) => ReactNode
  selectPlacement?: string
  totalBoundaryShowSizeChanger?: number
}
