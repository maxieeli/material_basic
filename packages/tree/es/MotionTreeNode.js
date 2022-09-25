var _excluded = ["className", "style", "motion", "motionNodes", "motionType", "onMotionStart", "onMotionEnd", "active", "treeNodeRequiredProps"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import { useEffect, useState, useContext, useRef, forwardRef } from 'react';
import classNames from 'classnames';
import CSSMotion from 'rc-motion';
import TreeNode from "./TreeNode";
import { getTreeNodeProps } from "./utils/treeUtil";
import { TreeContext } from "./contextType";
import { createElement as _createElement } from "react";
import { jsx as _jsx } from "react/jsx-runtime";

var MotionTreeNode = function MotionTreeNode(_ref, ref) {
  var className = _ref.className,
      style = _ref.style,
      motion = _ref.motion,
      motionNodes = _ref.motionNodes,
      motionType = _ref.motionType,
      onOriginMotionStart = _ref.onMotionStart,
      onOriginMotionEnd = _ref.onMotionEnd,
      active = _ref.active,
      treeNodeRequiredProps = _ref.treeNodeRequiredProps,
      props = _objectWithoutProperties(_ref, _excluded);

  var _useState = useState(true),
      _useState2 = _slicedToArray(_useState, 2),
      visible = _useState2[0],
      setVisible = _useState2[1];

  var _useContext = useContext(TreeContext),
      prefixCls = _useContext.prefixCls;

  var motionedRef = useRef(false);

  var onMotionEnd = function onMotionEnd() {
    if (!motionedRef.current) {
      onOriginMotionEnd();
    }

    motionedRef.current = true;
  };

  useEffect(function () {
    if (motionNodes && motionType === 'hide' && visible) {
      setVisible(false);
    }
  }, [motionNodes]);
  useEffect(function () {
    // Trigger motion only when patched
    if (motionNodes) {
      onOriginMotionStart();
    }

    return function () {
      if (motionNodes) {
        onMotionEnd();
      }
    };
  }, []);

  if (motionNodes) {
    return /*#__PURE__*/_jsx(CSSMotion, _objectSpread(_objectSpread({
      ref: ref,
      visible: visible
    }, motion), {}, {
      motionAppear: motionType === 'show',
      onAppearEnd: onMotionEnd,
      onLeaveEnd: onMotionEnd,
      children: function children(_ref2, motionRef) {
        var motionClassName = _ref2.className,
            motionStyle = _ref2.style;
        return /*#__PURE__*/_jsx("div", {
          ref: motionRef,
          className: classNames("".concat(prefixCls, "-treenode-motion"), motionClassName),
          style: motionStyle,
          children: motionNodes.map(function (treeNode) {
            var restProps = Object.assign({}, treeNode.data),
                title = treeNode.title,
                key = treeNode.key,
                isStart = treeNode.isStart,
                isEnd = treeNode.isEnd;
            delete restProps.children;
            var treeNodeProps = getTreeNodeProps(key, treeNodeRequiredProps);
            return /*#__PURE__*/_createElement(TreeNode, _objectSpread(_objectSpread(_objectSpread({}, restProps), treeNodeProps), {}, {
              title: title,
              active: active,
              data: treeNode.data,
              key: key,
              isStart: isStart,
              isEnd: isEnd
            }));
          })
        });
      }
    }));
  }

  return /*#__PURE__*/_jsx(TreeNode, _objectSpread(_objectSpread({
    domRef: ref,
    className: className,
    style: style
  }, props), {}, {
    active: active
  }));
};

MotionTreeNode.displayName = 'MotionTreeNode';
var RefMotionTreeNode = /*#__PURE__*/forwardRef(MotionTreeNode);
export default RefMotionTreeNode;