import { useRef, useCallback } from 'react';
/**
 * Same as `useCallback` but always return a memoized function
 * but redirect to real function.
 */

export default function useRefFunc(callback) {
  var funcRef = useRef();
  funcRef.current = callback;
  var cacheFn = useCallback(function () {
    return funcRef.current.apply(funcRef, arguments);
  }, []);
  return cacheFn;
}