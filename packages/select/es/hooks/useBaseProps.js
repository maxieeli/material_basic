import { createContext, useContext } from 'react';
export var BaseSelectContext = /*#__PURE__*/createContext(null);
export default function useBaseProps() {
  return useContext(BaseSelectContext);
}