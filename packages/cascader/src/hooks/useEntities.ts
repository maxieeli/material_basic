import { useRef, useCallback } from 'react'
import { convertDataToEntities } from '@owen-basic/tree/es/utils/treeUtil'
import type { DataEntity } from '@owen-basic/tree/es/interface'
import type { DefaultOptionType, InternalFieldNames } from '../Cascader'
import { VALUE_SPLIT } from '../utils/commonUtil'

export interface OptionsInfo {
  keyEntities: Record<string, DataEntity>
  pathKeyEntities: Record<string, DataEntity>
}

export type GetEntities = () => OptionsInfo['pathKeyEntities']

/** Lazy parse options data into conduct-able info to avoid perf issue in single mode */
export default (options: DefaultOptionType[], fieldNames: InternalFieldNames) => {
  const cacheRef = useRef<{
    options: DefaultOptionType[]
    info: OptionsInfo
  }>({
    options: null,
    info: null,
  })

  const getEntities: GetEntities = useCallback(() => {
    if (cacheRef.current.options !== options) {
      cacheRef.current.options = options
      cacheRef.current.info = convertDataToEntities(options as any, {
        fieldNames,
        initWrapper: wrapper => ({
          ...wrapper,
          pathKeyEntities: {},
        }),
        processEntity: (entity, wrapper: any) => {
          const pathKey = entity.nodes.map(node => node[fieldNames.value]).join(VALUE_SPLIT)
          wrapper.pathKeyEntities[pathKey] = entity
          entity.key = pathKey
        },
      }) as any
    }

    return cacheRef.current.info.pathKeyEntities
  }, [fieldNames, options])

  return getEntities
}
