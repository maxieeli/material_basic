function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { forwardRef, useRef, useContext, useState, useEffect, useMemo } from 'react';
import classNames from 'classnames';
import { useBaseProps } from '@owen-basic/select';
import CascaderContext from "../context";
import { isLeaf, scrollIntoParentView, toPathKey, toPathKeys, toPathValueStr } from "../utils/commonUtil";
import { toPathOptions } from "../utils/treeUtil";
import Column, { FIX_LABEL } from "./Column";
import useActive from "./useActive";
import useKeyboard from "./useKeyboard";
import { jsx as _jsx } from "react/jsx-runtime";
var RefOptionList = /*#__PURE__*/forwardRef(function (props, ref) {
  var _optionColumns$, _optionColumns$$optio, _ref3;

  var _useBaseProps = useBaseProps(),
      prefixCls = _useBaseProps.prefixCls,
      multiple = _useBaseProps.multiple,
      searchValue = _useBaseProps.searchValue,
      toggleOpen = _useBaseProps.toggleOpen,
      notFoundContent = _useBaseProps.notFoundContent;

  var containerRef = useRef();

  var _useContext = useContext(CascaderContext),
      options = _useContext.options,
      values = _useContext.values,
      halfValues = _useContext.halfValues,
      fieldNames = _useContext.fieldNames,
      changeOnSelect = _useContext.changeOnSelect,
      onSelect = _useContext.onSelect,
      searchOptions = _useContext.searchOptions,
      dropdownPrefixCls = _useContext.dropdownPrefixCls,
      loadData = _useContext.loadData,
      expandTrigger = _useContext.expandTrigger;

  var mergedPrefixCls = dropdownPrefixCls || prefixCls; // ========================= loadData =========================

  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      loadingKeys = _useState2[0],
      setLoadingKeys = _useState2[1];

  var internalLoadData = function internalLoadData(valueCells) {
    // Do not load when search
    if (!loadData || searchValue) {
      return;
    }

    var optionList = toPathOptions(valueCells, options, fieldNames);
    var rawOptions = optionList.map(function (_ref) {
      var option = _ref.option;
      return option;
    });
    var lastOption = rawOptions[rawOptions.length - 1];

    if (lastOption && !isLeaf(lastOption, fieldNames)) {
      var pathKey = toPathKey(valueCells);
      setLoadingKeys(function (keys) {
        return [].concat(_toConsumableArray(keys), [pathKey]);
      });
      loadData(rawOptions);
    }
  }; // zombieJ: This is bad. We should make this same as `tree` to use Promise instead.


  useEffect(function () {
    if (loadingKeys.length) {
      loadingKeys.forEach(function (loadingKey) {
        var valueStrCells = toPathValueStr(loadingKey);
        var optionList = toPathOptions(valueStrCells, options, fieldNames, true).map(function (_ref2) {
          var option = _ref2.option;
          return option;
        });
        var lastOption = optionList[optionList.length - 1];

        if (!lastOption || lastOption[fieldNames.children] || isLeaf(lastOption, fieldNames)) {
          setLoadingKeys(function (keys) {
            return keys.filter(function (key) {
              return key !== loadingKey;
            });
          });
        }
      });
    }
  }, [options, loadingKeys, fieldNames]); // ========================== Values ==========================

  var checkedSet = useMemo(function () {
    return new Set(toPathKeys(values));
  }, [values]);
  var halfCheckedSet = useMemo(function () {
    return new Set(toPathKeys(halfValues));
  }, [halfValues]); // ====================== Accessibility =======================

  var _useActive = useActive(),
      _useActive2 = _slicedToArray(_useActive, 2),
      activeValueCells = _useActive2[0],
      setActiveValueCells = _useActive2[1]; // =========================== Path ===========================


  var onPathOpen = function onPathOpen(nextValueCells) {
    setActiveValueCells(nextValueCells); // Trigger loadData

    internalLoadData(nextValueCells);
  };

  var isSelectable = function isSelectable(option) {
    var disabled = option.disabled;
    var isMergedLeaf = isLeaf(option, fieldNames);
    return !disabled && (isMergedLeaf || changeOnSelect || multiple);
  };

  var onPathSelect = function onPathSelect(valuePath, leaf) {
    var fromKeyboard = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    onSelect(valuePath);

    if (!multiple && (leaf || changeOnSelect && (expandTrigger === 'hover' || fromKeyboard))) {
      toggleOpen(false);
    }
  }; // ========================== Option ==========================


  var mergedOptions = useMemo(function () {
    if (searchValue) {
      return searchOptions;
    }

    return options;
  }, [searchValue, searchOptions, options]); // ========================== Column ==========================

  var optionColumns = useMemo(function () {
    var optionList = [{
      options: mergedOptions
    }];
    var currentList = mergedOptions;

    var _loop = function _loop(i) {
      var activeValueCell = activeValueCells[i];
      var currentOption = currentList.find(function (option) {
        return option[fieldNames.value] === activeValueCell;
      });
      var subOptions = currentOption === null || currentOption === void 0 ? void 0 : currentOption[fieldNames.children];

      if (!(subOptions !== null && subOptions !== void 0 && subOptions.length)) {
        return "break";
      }

      currentList = subOptions;
      optionList.push({
        options: subOptions
      });
    };

    for (var i = 0; i < activeValueCells.length; i += 1) {
      var _ret = _loop(i);

      if (_ret === "break") break;
    }

    return optionList;
  }, [mergedOptions, activeValueCells, fieldNames]); // ========================= Keyboard =========================

  var onKeyboardSelect = function onKeyboardSelect(selectValueCells, option) {
    if (isSelectable(option)) {
      onPathSelect(selectValueCells, isLeaf(option, fieldNames), true);
    }
  };

  useKeyboard(ref, mergedOptions, fieldNames, activeValueCells, onPathOpen, onKeyboardSelect); // >>>>> Active Scroll

  useEffect(function () {
    for (var i = 0; i < activeValueCells.length; i += 1) {
      var _containerRef$current;

      var cellPath = activeValueCells.slice(0, i + 1);
      var cellKeyPath = toPathKey(cellPath);
      var ele = (_containerRef$current = containerRef.current) === null || _containerRef$current === void 0 ? void 0 : _containerRef$current.querySelector("li[data-path-key=\"".concat(cellKeyPath.replace(/\\{0,2}"/g, '\\"'), "\"]") // matches unescaped double quotes
      );

      if (ele) {
        scrollIntoParentView(ele);
      }
    }
  }, [activeValueCells]); // ========================== Render ==========================
  // >>>>> Empty

  var isEmpty = !((_optionColumns$ = optionColumns[0]) !== null && _optionColumns$ !== void 0 && (_optionColumns$$optio = _optionColumns$.options) !== null && _optionColumns$$optio !== void 0 && _optionColumns$$optio.length);
  var emptyList = [(_ref3 = {}, _defineProperty(_ref3, fieldNames.value, '__EMPTY__'), _defineProperty(_ref3, FIX_LABEL, notFoundContent), _defineProperty(_ref3, "disabled", true), _ref3)];

  var columnProps = _objectSpread(_objectSpread({}, props), {}, {
    multiple: !isEmpty && multiple,
    onSelect: onPathSelect,
    onActive: onPathOpen,
    onToggleOpen: toggleOpen,
    checkedSet: checkedSet,
    halfCheckedSet: halfCheckedSet,
    loadingKeys: loadingKeys,
    isSelectable: isSelectable
  }); // >>>>> Columns


  var mergedOptionColumns = isEmpty ? [{
    options: emptyList
  }] : optionColumns;
  var columnNodes = mergedOptionColumns.map(function (col, index) {
    var prevValuePath = activeValueCells.slice(0, index);
    var activeValue = activeValueCells[index];
    return /*#__PURE__*/_jsx(Column, _objectSpread(_objectSpread({}, columnProps), {}, {
      prefixCls: mergedPrefixCls,
      options: col.options,
      prevValuePath: prevValuePath,
      activeValue: activeValue
    }), index);
  }); // >>>>> Render

  return /*#__PURE__*/_jsx("div", {
    className: classNames("".concat(mergedPrefixCls, "-menus"), _defineProperty({}, "".concat(mergedPrefixCls, "-menu-empty"), isEmpty)),
    ref: containerRef,
    children: columnNodes
  });
});
export default RefOptionList;