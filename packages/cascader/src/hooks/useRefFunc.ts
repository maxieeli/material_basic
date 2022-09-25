import { useRef, useCallback } from 'react'

/**
 * Same as `useCallback` but always return a memoized function
 * but redirect to real function.
 */
export default function useRefFunc<T extends (...args: any[]) => any>(callback: T): T {
  const funcRef = useRef<T>()
  funcRef.current = callback

  const cacheFn = useCallback((...args: any[]) => {
    return funcRef.current(...args)
  }, [])

  return cacheFn as any
}
