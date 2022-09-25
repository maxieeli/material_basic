function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

import { cloneElement, useRef } from 'react';
import classNames from 'classnames';
import { hasAddon, hasPrefixSuffix } from "./utils/commonUtils";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var BaseInput = function BaseInput(props) {
  var inputElement = props.inputElement,
      prefixCls = props.prefixCls,
      prefix = props.prefix,
      suffix = props.suffix,
      addonBefore = props.addonBefore,
      addonAfter = props.addonAfter,
      className = props.className,
      style = props.style,
      affixWrapperClassName = props.affixWrapperClassName,
      groupClassName = props.groupClassName,
      wrapperClassName = props.wrapperClassName,
      disabled = props.disabled,
      readOnly = props.readOnly,
      focused = props.focused,
      triggerFocus = props.triggerFocus,
      allowClear = props.allowClear,
      value = props.value,
      handleReset = props.handleReset,
      hidden = props.hidden;
  var containerRef = useRef(null);

  var onInputMouseDown = function onInputMouseDown(e) {
    var _containerRef$current;

    if ((_containerRef$current = containerRef.current) !== null && _containerRef$current !== void 0 && _containerRef$current.contains(e.target)) {
      triggerFocus === null || triggerFocus === void 0 ? void 0 : triggerFocus();
    }
  }; // ================== Clear Icon ================== //


  var getClearIcon = function getClearIcon() {
    var _classNames;

    if (!allowClear) {
      return null;
    }

    var needClear = !disabled && !readOnly && value;
    var clearIconCls = "".concat(prefixCls, "-clear-icon");
    var iconNode = _typeof(allowClear) === 'object' && allowClear !== null && allowClear !== void 0 && allowClear.clearIcon ? allowClear.clearIcon : '✖';
    return /*#__PURE__*/_jsx("span", {
      onClick: handleReset,
      onMouseDown: function onMouseDown(e) {
        return e.preventDefault();
      },
      className: classNames(clearIconCls, (_classNames = {}, _defineProperty(_classNames, "".concat(clearIconCls, "-hidden"), !needClear), _defineProperty(_classNames, "".concat(clearIconCls, "-has-suffix"), !!suffix), _classNames)),
      role: "button",
      tabIndex: -1,
      children: iconNode
    });
  };

  var element = /*#__PURE__*/cloneElement(inputElement, {
    value: value,
    hidden: hidden
  }); // ================== Prefix & Suffix ================== //

  if (hasPrefixSuffix(props)) {
    var _classNames2;

    var affixWrapperPrefixCls = "".concat(prefixCls, "-affix-wrapper");
    var affixWrapperCls = classNames(affixWrapperPrefixCls, (_classNames2 = {}, _defineProperty(_classNames2, "".concat(affixWrapperPrefixCls, "-disabled"), disabled), _defineProperty(_classNames2, "".concat(affixWrapperPrefixCls, "-focused"), focused), _defineProperty(_classNames2, "".concat(affixWrapperPrefixCls, "-readonly"), readOnly), _defineProperty(_classNames2, "".concat(affixWrapperPrefixCls, "-input-with-clear-btn"), suffix && allowClear && value), _classNames2), !hasAddon(props) && className, affixWrapperClassName);

    var suffixNode = (suffix || allowClear) && /*#__PURE__*/_jsxs("span", {
      className: "".concat(prefixCls, "-suffix"),
      children: [getClearIcon(), suffix]
    });

    element = /*#__PURE__*/_jsxs("span", {
      className: affixWrapperCls,
      style: style,
      hidden: !hasAddon(props) && hidden,
      onMouseDown: onInputMouseDown,
      ref: containerRef,
      children: [prefix && /*#__PURE__*/_jsx("span", {
        className: "".concat(prefixCls, "-prefix"),
        children: prefix
      }), /*#__PURE__*/cloneElement(inputElement, {
        style: null,
        value: value,
        hidden: null
      }), suffixNode]
    });
  } // ================== Addon ================== //


  if (hasAddon(props)) {
    var wrapperCls = "".concat(prefixCls, "-group");
    var addonCls = "".concat(wrapperCls, "-addon");
    var mergedWrapperClassName = classNames("".concat(prefixCls, "-wrapper"), wrapperCls, wrapperClassName);
    var mergedGroupClassName = classNames("".concat(prefixCls, "-group-wrapper"), className, groupClassName);
    return /*#__PURE__*/_jsx("span", {
      className: mergedGroupClassName,
      style: style,
      hidden: hidden,
      children: /*#__PURE__*/_jsxs("span", {
        className: mergedWrapperClassName,
        children: [addonBefore && /*#__PURE__*/_jsx("span", {
          className: addonCls,
          children: addonBefore
        }), /*#__PURE__*/cloneElement(element, {
          style: null,
          hidden: null
        }), addonAfter && /*#__PURE__*/_jsx("span", {
          className: addonCls,
          children: addonAfter
        })]
      })
    });
  }

  return element;
};

export default BaseInput;