import { useLayoutEffect as useReactLayoutEffect } from 'react'
import type { EffectCallback, DependencyList } from 'react'

export default function useLayoutEffect(effect: EffectCallback, deps?: DependencyList) {
  useReactLayoutEffect(effect, deps)
}
