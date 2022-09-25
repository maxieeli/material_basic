function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import classNames from 'classnames';
import { jsx as _jsx } from "react/jsx-runtime";

var Pager = function Pager(props) {
  var _classNames;

  var prefixCls = "".concat(props.rootPrefixCls, "-item");
  var cls = classNames(prefixCls, "".concat(prefixCls, "-").concat(props.page), (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-active"), props.active), _defineProperty(_classNames, "".concat(prefixCls, "-disabled"), !props.page), _defineProperty(_classNames, props.className, !!props.className), _classNames));

  var handleClick = function handleClick() {
    props.onClick(props.page);
  };

  var handleKeyPress = function handleKeyPress(e) {
    props.onKeyPress(e, props.onClick, props.page);
  };

  return /*#__PURE__*/_jsx("li", {
    title: props.showTitle ? props.page : null,
    className: cls,
    onClick: handleClick,
    onKeyPress: handleKeyPress,
    tabIndex: "0",
    children: props.itemRender(props.page, 'page', /*#__PURE__*/_jsx("a", {
      rel: "nofollow",
      children: props.page
    }))
  });
};

export default Pager;