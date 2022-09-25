import { useMemo } from 'react'
import type { CascaderProps, ShowSearchType } from '../Cascader'

// Convert `showSearch` to unique config
export default function useSearchConfig(showSearch?: CascaderProps['showSearch']) {
  return useMemo<[boolean, ShowSearchType]>(() => {
    if (!showSearch) {
      return [false, {}]
    }

    let searchConfig: ShowSearchType = {
      matchInputWidth: true,
      limit: 50,
    }

    if (showSearch && typeof showSearch === 'object') {
      searchConfig = {
        ...searchConfig,
        ...showSearch,
      }
    }

    if (searchConfig.limit <= 0) {
      delete searchConfig.limit
    }

    return [true, searchConfig]
  }, [showSearch])
}
