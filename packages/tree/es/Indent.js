function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { memo } from 'react';
import classNames from 'classnames';
import { jsx as _jsx } from "react/jsx-runtime";

var Indent = function Indent(_ref) {
  var prefixCls = _ref.prefixCls,
      level = _ref.level,
      isStart = _ref.isStart,
      isEnd = _ref.isEnd;
  var baseClassName = "".concat(prefixCls, "-indent-unit");
  var list = [];

  for (var i = 0; i < level; i += 1) {
    var _classNames;

    list.push( /*#__PURE__*/_jsx("span", {
      className: classNames(baseClassName, (_classNames = {}, _defineProperty(_classNames, "".concat(baseClassName, "-start"), isStart[i]), _defineProperty(_classNames, "".concat(baseClassName, "-end"), isEnd[i]), _classNames))
    }, i));
  }

  return /*#__PURE__*/_jsx("span", {
    "aria-hidden": "true",
    className: "".concat(prefixCls, "-indent"),
    children: list
  });
};

export default /*#__PURE__*/memo(Indent);