function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { useRef, useEffect, useState, useContext, useMemo } from 'react';
import classNames from 'classnames';
import CSSMotion from 'rc-motion';
import DrawerPanel from "./Panel";
import DrawerContext from "./context";
import KeyCode from 'rc-util/lib/KeyCode';
import { parseWidthHeight } from "./utils";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var sentinelStyle = {
  width: 0,
  height: 0,
  overflow: 'hidden',
  outline: 'none',
  position: 'absolute'
};
export default function DrawerPopup(props) {
  var _ref, _pushConfig$distance, _pushConfig, _classNames;

  var prefixCls = props.prefixCls,
      open = props.open,
      placement = props.placement,
      inline = props.inline,
      push = props.push,
      forceRender = props.forceRender,
      autoFocus = props.autoFocus,
      keyboard = props.keyboard,
      scrollLocker = props.scrollLocker,
      rootClassName = props.rootClassName,
      rootStyle = props.rootStyle,
      zIndex = props.zIndex,
      className = props.className,
      style = props.style,
      motion = props.motion,
      width = props.width,
      height = props.height,
      _children = props.children,
      contentWrapperStyle = props.contentWrapperStyle,
      mask = props.mask,
      maskClosable = props.maskClosable,
      maskMotion = props.maskMotion,
      maskClassName = props.maskClassName,
      maskStyle = props.maskStyle,
      afterOpenChange = props.afterOpenChange,
      onClose = props.onClose; // ================================ Refs ================================

  var panelRef = useRef();
  var sentinelStartRef = useRef();
  var sentinelEndRef = useRef();

  var onPanelKeyDown = function onPanelKeyDown(event) {
    var keyCode = event.keyCode,
        shiftKey = event.shiftKey;

    switch (keyCode) {
      // Tab active
      case KeyCode.TAB:
        {
          if (keyCode === KeyCode.TAB) {
            if (!shiftKey && document.activeElement === sentinelEndRef.current) {
              var _sentinelStartRef$cur;

              (_sentinelStartRef$cur = sentinelStartRef.current) === null || _sentinelStartRef$cur === void 0 ? void 0 : _sentinelStartRef$cur.focus({
                preventScroll: true
              });
            } else if (shiftKey && document.activeElement === sentinelStartRef.current) {
              var _sentinelEndRef$curre;

              (_sentinelEndRef$curre = sentinelEndRef.current) === null || _sentinelEndRef$curre === void 0 ? void 0 : _sentinelEndRef$curre.focus({
                preventScroll: true
              });
            }
          }

          break;
        }
      // Close

      case KeyCode.ESC:
        {
          if (onClose && keyboard) {
            onClose(event);
          }

          break;
        }
    }
  }; // ========================== Control ===========================
  // Auto Focus


  useEffect(function () {
    if (open && autoFocus) {
      var _panelRef$current;

      (_panelRef$current = panelRef.current) === null || _panelRef$current === void 0 ? void 0 : _panelRef$current.focus({
        preventScroll: true
      });
    }
  }, [open, autoFocus]); // ============================ Push ============================

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      pushed = _useState2[0],
      setPushed = _useState2[1];

  var parentContext = useContext(DrawerContext); // Merge push distance

  var pushConfig;

  if (push === false) {
    pushConfig = {
      distance: 0
    };
  } else if (push === true) {
    pushConfig = {};
  } else {
    pushConfig = push || {};
  }

  var pushDistance = (_ref = (_pushConfig$distance = (_pushConfig = pushConfig) === null || _pushConfig === void 0 ? void 0 : _pushConfig.distance) !== null && _pushConfig$distance !== void 0 ? _pushConfig$distance : parentContext === null || parentContext === void 0 ? void 0 : parentContext.pushDistance) !== null && _ref !== void 0 ? _ref : 180;
  var mergedContext = useMemo(function () {
    return {
      pushDistance: pushDistance,
      push: function push() {
        setPushed(true);
      },
      pull: function pull() {
        setPushed(false);
      }
    };
  }, [pushDistance]); // ========================= ScrollLock =========================
  // Tell parent to push

  useEffect(function () {
    if (open) {
      var _parentContext$push;

      parentContext === null || parentContext === void 0 ? void 0 : (_parentContext$push = parentContext.push) === null || _parentContext$push === void 0 ? void 0 : _parentContext$push.call(parentContext);
    } else {
      var _parentContext$pull;

      parentContext === null || parentContext === void 0 ? void 0 : (_parentContext$pull = parentContext.pull) === null || _parentContext$pull === void 0 ? void 0 : _parentContext$pull.call(parentContext);
    }
  }, [open]); // Lock window scroll

  useEffect(function () {
    if (open && mask) {
      scrollLocker === null || scrollLocker === void 0 ? void 0 : scrollLocker.lock();
    }
  }, [open, mask]); // Clean up

  useEffect(function () {
    return function () {
      var _parentContext$pull2;

      scrollLocker === null || scrollLocker === void 0 ? void 0 : scrollLocker.unLock();
      parentContext === null || parentContext === void 0 ? void 0 : (_parentContext$pull2 = parentContext.pull) === null || _parentContext$pull2 === void 0 ? void 0 : _parentContext$pull2.call(parentContext);
    };
  }, []); // ============================ Mask ============================

  var maskNode = mask && /*#__PURE__*/_jsx(CSSMotion, _objectSpread(_objectSpread({}, maskMotion), {}, {
    visible: open,
    children: function children(_ref2, maskRef) {
      var motionMaskClassName = _ref2.className,
          motionMaskStyle = _ref2.style;
      return /*#__PURE__*/_jsx("div", {
        className: classNames("".concat(prefixCls, "-mask"), motionMaskClassName, maskClassName),
        style: _objectSpread(_objectSpread({}, motionMaskStyle), maskStyle),
        onClick: maskClosable ? onClose : undefined,
        ref: maskRef
      });
    }
  }), "mask"); // =========================== Panel ============================


  var motionProps = typeof motion === 'function' ? motion(placement) : motion;
  var wrapperStyle = {};

  if (pushed && pushDistance) {
    switch (placement) {
      case 'top':
        wrapperStyle.transform = "translateY(".concat(pushDistance, "px)");
        break;

      case 'bottom':
        wrapperStyle.transform = "translateY(".concat(-pushDistance, "px)");
        break;

      case 'left':
        wrapperStyle.transform = "translateX(".concat(pushDistance, "px)");
        break;

      default:
        wrapperStyle.transform = "translateX(".concat(-pushDistance, "px)");
        break;
    }
  }

  if (placement === 'left' || placement === 'right') {
    wrapperStyle.width = parseWidthHeight(width);
  } else {
    wrapperStyle.height = parseWidthHeight(height);
  }

  var panelNode = /*#__PURE__*/_jsx(CSSMotion, _objectSpread(_objectSpread({}, motionProps), {}, {
    visible: open,
    forceRender: forceRender,
    onVisibleChanged: function onVisibleChanged(nextVisible) {
      afterOpenChange === null || afterOpenChange === void 0 ? void 0 : afterOpenChange(nextVisible);

      if (!nextVisible) {
        scrollLocker === null || scrollLocker === void 0 ? void 0 : scrollLocker.unLock();
      }
    },
    removeOnLeave: false,
    leavedClassName: "".concat(prefixCls, "-content-wrapper-hidden"),
    children: function children(_ref3, motionRef) {
      var motionClassName = _ref3.className,
          motionStyle = _ref3.style;
      return /*#__PURE__*/_jsx("div", {
        className: classNames("".concat(prefixCls, "-content-wrapper"), motionClassName),
        style: _objectSpread(_objectSpread(_objectSpread({}, wrapperStyle), motionStyle), contentWrapperStyle),
        children: /*#__PURE__*/_jsx(DrawerPanel, {
          containerRef: motionRef,
          prefixCls: prefixCls,
          className: className,
          style: style,
          children: _children
        })
      });
    }
  }), "panel"); // =========================== Render ===========================


  var containerStyle = _objectSpread({}, rootStyle);

  if (zIndex) {
    containerStyle.zIndex = zIndex;
  }

  return /*#__PURE__*/_jsx(DrawerContext.Provider, {
    value: mergedContext,
    children: /*#__PURE__*/_jsxs("div", {
      className: classNames(prefixCls, "".concat(prefixCls, "-").concat(placement), rootClassName, (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-open"), open), _defineProperty(_classNames, "".concat(prefixCls, "-inline"), inline), _classNames)),
      style: containerStyle,
      tabIndex: -1,
      ref: panelRef,
      onKeyDown: onPanelKeyDown,
      children: [maskNode, /*#__PURE__*/_jsx("div", {
        tabIndex: 0,
        ref: sentinelStartRef,
        style: sentinelStyle,
        "aria-hidden": "true",
        "data-sentinel": "start"
      }), panelNode, /*#__PURE__*/_jsx("div", {
        tabIndex: 0,
        ref: sentinelEndRef,
        style: sentinelStyle,
        "aria-hidden": "true",
        "data-sentinel": "end"
      })]
    })
  });
}