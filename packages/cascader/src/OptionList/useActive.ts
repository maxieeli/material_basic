import { useState, useContext, useEffect } from 'react'
import type { Key } from 'react'
import { useBaseProps } from '@owen-basic/select'
import CascaderContext from '../context'

/**
 * Control the active open options path.
 */
export default (): [Array<Key>, (activeValueCells: Array<Key>) => void] => {
  const { multiple, open } = useBaseProps()
  const { values } = useContext(CascaderContext)

  // Record current dropdown active options
  // This also control the open status
  const [activeValueCells, setActiveValueCells] = useState<Array<Key>>([])

  useEffect(
    () => {
      if (open && !multiple) {
        const firstValueCells = values[0]
        setActiveValueCells(firstValueCells || [])
      }
    },
    [open],
  )

  return [activeValueCells, setActiveValueCells]
}
