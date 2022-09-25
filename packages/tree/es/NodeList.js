var _excluded = ["prefixCls", "data", "selectable", "checkable", "expandedKeys", "selectedKeys", "checkedKeys", "loadedKeys", "loadingKeys", "halfCheckedKeys", "keyEntities", "disabled", "dragging", "dragOverNodeKey", "dropPosition", "motion", "height", "itemHeight", "virtual", "focusable", "activeItem", "focused", "tabIndex", "onKeyDown", "onFocus", "onBlur", "onActiveChange", "onListChangeStart", "onListChangeEnd"];

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

import { forwardRef, useRef, useImperativeHandle, useEffect, useState } from 'react';
import VirtualList from 'rc-virtual-list';
import MotionTreeNode from "./MotionTreeNode";
import { findExpandedKeys, getExpandRange } from "./utils/diffUtil";
import { getTreeNodeProps, getKey } from "./utils/treeUtil";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var HIDDEN_STYLE = {
  width: 0,
  height: 0,
  display: 'flex',
  overflow: 'hidden',
  opacity: 0,
  border: 0,
  padding: 0,
  margin: 0
};

var noop = function noop() {};

export var MOTION_KEY = "RC_TREE_MOTION_".concat(Math.random());
var MotionNode = {
  key: MOTION_KEY
};
export var MotionEntity = {
  key: MOTION_KEY,
  level: 0,
  index: 0,
  pos: '0',
  node: MotionNode,
  nodes: [MotionNode]
};
var MotionFlattenData = {
  parent: null,
  children: [],
  pos: MotionEntity.pos,
  data: MotionNode,
  title: null,
  key: MOTION_KEY,

  /** Hold empty list here since we do not use it */
  isStart: [],
  isEnd: []
};

/**
* We only need get visible content items to play the animation.
*/
export function getMinimumRangeTransitionRange(list, virtual, height, itemHeight) {
  if (virtual === false || !height) {
    return list;
  }

  return list.slice(0, Math.ceil(height / itemHeight) + 1);
}

function itemKey(item) {
  var key = item.key,
      pos = item.pos;
  return getKey(key, pos);
}

function getAccessibilityPath(item) {
  var path = String(item.data.key);
  var current = item;

  while (current.parent) {
    current = current.parent;
    path = "".concat(current.data.key, " > ").concat(path);
  }

  return path;
}

var NodeList = /*#__PURE__*/forwardRef(function (props, ref) {
  var prefixCls = props.prefixCls,
      data = props.data,
      selectable = props.selectable,
      checkable = props.checkable,
      expandedKeys = props.expandedKeys,
      selectedKeys = props.selectedKeys,
      checkedKeys = props.checkedKeys,
      loadedKeys = props.loadedKeys,
      loadingKeys = props.loadingKeys,
      halfCheckedKeys = props.halfCheckedKeys,
      keyEntities = props.keyEntities,
      disabled = props.disabled,
      dragging = props.dragging,
      dragOverNodeKey = props.dragOverNodeKey,
      dropPosition = props.dropPosition,
      motion = props.motion,
      height = props.height,
      itemHeight = props.itemHeight,
      virtual = props.virtual,
      focusable = props.focusable,
      activeItem = props.activeItem,
      focused = props.focused,
      tabIndex = props.tabIndex,
      onKeyDown = props.onKeyDown,
      onFocus = props.onFocus,
      onBlur = props.onBlur,
      onActiveChange = props.onActiveChange,
      onListChangeStart = props.onListChangeStart,
      onListChangeEnd = props.onListChangeEnd,
      domProps = _objectWithoutProperties(props, _excluded); // =============================== Ref ================================


  var listRef = useRef(null);
  var indentMeasurerRef = useRef(null);
  useImperativeHandle(ref, function () {
    return {
      scrollTo: function scrollTo(scroll) {
        listRef.current.scrollTo(scroll);
      },
      getIndentWidth: function getIndentWidth() {
        return indentMeasurerRef.current.offsetWidth;
      }
    };
  }); // ============================== Motion ==============================

  var _useState = useState(expandedKeys),
      _useState2 = _slicedToArray(_useState, 2),
      prevExpandedKeys = _useState2[0],
      setPrevExpandedKeys = _useState2[1];

  var _useState3 = useState(data),
      _useState4 = _slicedToArray(_useState3, 2),
      prevData = _useState4[0],
      setPrevData = _useState4[1];

  var _useState5 = useState(data),
      _useState6 = _slicedToArray(_useState5, 2),
      transitionData = _useState6[0],
      setTransitionData = _useState6[1];

  var _useState7 = useState([]),
      _useState8 = _slicedToArray(_useState7, 2),
      transitionRange = _useState8[0],
      setTransitionRange = _useState8[1];

  var _useState9 = useState(null),
      _useState10 = _slicedToArray(_useState9, 2),
      motionType = _useState10[0],
      setMotionType = _useState10[1]; // When motion end but data change, this will makes data back to previous one


  var dataRef = useRef(data);
  dataRef.current = data;

  function onMotionEnd() {
    var latestData = dataRef.current;
    setPrevData(latestData);
    setTransitionData(latestData);
    setTransitionRange([]);
    setMotionType(null);
    onListChangeEnd();
  } // Do animation if expanded keys changed


  useEffect(function () {
    setPrevExpandedKeys(expandedKeys);
    var diffExpanded = findExpandedKeys(prevExpandedKeys, expandedKeys);

    if (diffExpanded.key !== null) {
      if (diffExpanded.add) {
        var keyIndex = prevData.findIndex(function (_ref) {
          var key = _ref.key;
          return key === diffExpanded.key;
        });
        var rangeNodes = getMinimumRangeTransitionRange(getExpandRange(prevData, data, diffExpanded.key), virtual, height, itemHeight);
        var newTransitionData = prevData.slice();
        newTransitionData.splice(keyIndex + 1, 0, MotionFlattenData);
        setTransitionData(newTransitionData);
        setTransitionRange(rangeNodes);
        setMotionType('show');
      } else {
        var _keyIndex = data.findIndex(function (_ref2) {
          var key = _ref2.key;
          return key === diffExpanded.key;
        });

        var _rangeNodes = getMinimumRangeTransitionRange(getExpandRange(data, prevData, diffExpanded.key), virtual, height, itemHeight);

        var _newTransitionData = data.slice();

        _newTransitionData.splice(_keyIndex + 1, 0, MotionFlattenData);

        setTransitionData(_newTransitionData);
        setTransitionRange(_rangeNodes);
        setMotionType('hide');
      }
    } else if (prevData !== data) {
      // If whole data changed, we just refresh the list
      setPrevData(data);
      setTransitionData(data);
    }
  }, [expandedKeys, data]); // We should clean up motion if is changed by dragging

  useEffect(function () {
    if (!dragging) {
      onMotionEnd();
    }
  }, [dragging]);
  var mergedData = motion ? transitionData : data;
  var treeNodeRequiredProps = {
    expandedKeys: expandedKeys,
    selectedKeys: selectedKeys,
    loadedKeys: loadedKeys,
    loadingKeys: loadingKeys,
    checkedKeys: checkedKeys,
    halfCheckedKeys: halfCheckedKeys,
    dragOverNodeKey: dragOverNodeKey,
    dropPosition: dropPosition,
    keyEntities: keyEntities
  };
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [focused && activeItem && /*#__PURE__*/_jsx("span", {
      style: HIDDEN_STYLE,
      "aria-live": "assertive",
      children: getAccessibilityPath(activeItem)
    }), /*#__PURE__*/_jsx("div", {
      children: /*#__PURE__*/_jsx("input", {
        style: HIDDEN_STYLE,
        disabled: focusable === false || disabled,
        tabIndex: focusable !== false ? tabIndex : null,
        onKeyDown: onKeyDown,
        onFocus: onFocus,
        onBlur: onBlur,
        value: "",
        onChange: noop,
        "aria-label": "for screen reader"
      })
    }), /*#__PURE__*/_jsx("div", {
      className: "".concat(prefixCls, "-treenode"),
      "aria-hidden": true,
      style: {
        position: 'absolute',
        pointerEvents: 'none',
        visibility: 'hidden',
        height: 0,
        overflow: 'hidden'
      },
      children: /*#__PURE__*/_jsx("div", {
        className: "".concat(prefixCls, "-indent"),
        children: /*#__PURE__*/_jsx("div", {
          ref: indentMeasurerRef,
          className: "".concat(prefixCls, "-indent-unit")
        })
      })
    }), /*#__PURE__*/_jsx(VirtualList, _objectSpread(_objectSpread({}, domProps), {}, {
      data: mergedData,
      itemKey: itemKey,
      height: height,
      fullHeight: false,
      virtual: virtual,
      itemHeight: itemHeight,
      prefixCls: "".concat(prefixCls, "-list"),
      ref: listRef,
      onVisibleChange: function onVisibleChange(originList, fullList) {
        var originSet = new Set(originList);
        var restList = fullList.filter(function (item) {
          return !originSet.has(item);
        }); // Motion node is not render. Skip motion

        if (restList.some(function (item) {
          return itemKey(item) === MOTION_KEY;
        })) {
          onMotionEnd();
        }
      },
      children: function children(treeNode) {
        var pos = treeNode.pos,
            restProps = Object.assign({}, treeNode.data),
            title = treeNode.title,
            key = treeNode.key,
            isStart = treeNode.isStart,
            isEnd = treeNode.isEnd;
        var mergedKey = getKey(key, pos);
        delete restProps.key;
        delete restProps.children;
        var treeNodeProps = getTreeNodeProps(mergedKey, treeNodeRequiredProps);
        return /*#__PURE__*/_jsx(MotionTreeNode, _objectSpread(_objectSpread(_objectSpread({}, restProps), treeNodeProps), {}, {
          title: title,
          active: !!activeItem && key === activeItem.key,
          pos: pos,
          data: treeNode.data,
          isStart: isStart,
          isEnd: isEnd,
          motion: motion,
          motionNodes: key === MOTION_KEY ? transitionRange : null,
          motionType: motionType,
          onMotionStart: onListChangeStart,
          onMotionEnd: onMotionEnd,
          treeNodeRequiredProps: treeNodeRequiredProps,
          onMouseMove: function onMouseMove() {
            onActiveChange(null);
          }
        }));
      }
    }))]
  });
});
NodeList.displayName = 'NodeList';
export default NodeList;