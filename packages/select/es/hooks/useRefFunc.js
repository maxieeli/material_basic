import { useCallback, useRef } from 'react';
export default function useRefFunc(callback) {
  var funcRef = useRef();
  funcRef.current = callback;
  var cacheFn = useCallback(function () {
    return funcRef.current.apply(funcRef, arguments);
  }, []);
  return cacheFn;
}