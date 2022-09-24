import { useCallback, useRef } from 'react'

export default function useRefFunc<T extends (...args: any[]) => any>(
  callback: T
): T {
  const funcRef = useRef<T>()
  funcRef.current = callback

  const cacheFn = useCallback((...args: any[]) => {
    return funcRef.current(...args)
  }, [])

  return cacheFn as any
}
