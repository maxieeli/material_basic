import { useEffect, useLayoutEffect } from 'react'
import canUseDom from 'rc-util/lib/Dom/canUseDom'

const useIsomorphicLayoutEffect = canUseDom()
  ? useLayoutEffect
  : useEffect

export default useIsomorphicLayoutEffect
