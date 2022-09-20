import { useRef, useCallback, useEffect } from 'react'
import { animationEndName, transitionEndName } from '../util/motion'
import type { MotionEvent } from '../interface'

export default (
  callback: (event: MotionEvent) => void,
): [(element: HTMLElement) => void, (element: HTMLElement) => void] => {
  const cacheElementRef = useRef<HTMLElement>()
  const callbackRef = useRef(callback)
  callbackRef.current = callback

  const onInternalMotionEnd = useCallback((event: MotionEvent) => {
    callbackRef.current(event)
  }, [])

  function removeMotionEvents(element: HTMLElement) {
    if (element) {
      element.removeEventListener(transitionEndName, onInternalMotionEnd)
      element.removeEventListener(animationEndName, onInternalMotionEnd)
    }
  }

  function patchMotionEvents(element: HTMLElement) {
    if (cacheElementRef.current && cacheElementRef.current !== element) {
      removeMotionEvents(cacheElementRef.current);
    }

    if (element && element !== cacheElementRef.current) {
      element.addEventListener(transitionEndName, onInternalMotionEnd);
      element.addEventListener(animationEndName, onInternalMotionEnd);

      // Save as cache in case dom removed trigger by `motionDeadline`
      cacheElementRef.current = element;
    }
  }

  useEffect(() => () => {
    removeMotionEvents(cacheElementRef.current)
  }, [])
  return [patchMotionEvents, removeMotionEvents]
}
