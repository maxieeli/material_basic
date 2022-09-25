function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { useContext } from 'react';
import classNames from 'classnames';
import CascaderContext from "../context";
import { jsx as _jsx } from "react/jsx-runtime";
export default function Checkbox(_ref) {
  var _classNames;

  var prefixCls = _ref.prefixCls,
      checked = _ref.checked,
      halfChecked = _ref.halfChecked,
      disabled = _ref.disabled,
      onClick = _ref.onClick;

  var _useContext = useContext(CascaderContext),
      checkable = _useContext.checkable;

  var customCheckbox = typeof checkable !== 'boolean' ? checkable : null;
  return /*#__PURE__*/_jsx("span", {
    className: classNames("".concat(prefixCls), (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-checked"), checked), _defineProperty(_classNames, "".concat(prefixCls, "-indeterminate"), !checked && halfChecked), _defineProperty(_classNames, "".concat(prefixCls, "-disabled"), disabled), _classNames)),
    onClick: onClick,
    children: customCheckbox
  });
}