function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import { useMemo, useContext } from 'react';
import classNames from 'classnames';
import { isLeaf, toPathKey } from "../utils/commonUtil";
import CascaderContext from "../context";
import Checkbox from "./Checkbox";
import { SEARCH_MARK } from "../hooks/useSearchOptions";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export var FIX_LABEL = '__cascader_fix_label__';
export default function Column(_ref) {
  var prefixCls = _ref.prefixCls,
      multiple = _ref.multiple,
      options = _ref.options,
      activeValue = _ref.activeValue,
      prevValuePath = _ref.prevValuePath,
      onToggleOpen = _ref.onToggleOpen,
      onSelect = _ref.onSelect,
      onActive = _ref.onActive,
      checkedSet = _ref.checkedSet,
      halfCheckedSet = _ref.halfCheckedSet,
      loadingKeys = _ref.loadingKeys,
      isSelectable = _ref.isSelectable;
  var menuPrefixCls = "".concat(prefixCls, "-menu");
  var menuItemPrefixCls = "".concat(prefixCls, "-menu-item");

  var _useContext = useContext(CascaderContext),
      fieldNames = _useContext.fieldNames,
      changeOnSelect = _useContext.changeOnSelect,
      expandTrigger = _useContext.expandTrigger,
      expandIcon = _useContext.expandIcon,
      loadingIcon = _useContext.loadingIcon,
      dropdownMenuColumnStyle = _useContext.dropdownMenuColumnStyle;

  var hoverOpen = expandTrigger === 'hover'; // ============================ Option ============================

  var optionInfoList = useMemo(function () {
    return options.map(function (option) {
      var _option$FIX_LABEL;

      var disabled = option.disabled;
      var searchOptions = option[SEARCH_MARK];
      var label = (_option$FIX_LABEL = option[FIX_LABEL]) !== null && _option$FIX_LABEL !== void 0 ? _option$FIX_LABEL : option[fieldNames.label];
      var value = option[fieldNames.value];
      var isMergedLeaf = isLeaf(option, fieldNames); // Get real value of option. Search option is different way.

      var fullPath = searchOptions ? searchOptions.map(function (opt) {
        return opt[fieldNames.value];
      }) : [].concat(_toConsumableArray(prevValuePath), [value]);
      var fullPathKey = toPathKey(fullPath);
      var isLoading = loadingKeys.includes(fullPathKey); // >>>>> checked

      var checked = checkedSet.has(fullPathKey); // >>>>> halfChecked

      var halfChecked = halfCheckedSet.has(fullPathKey);
      return {
        disabled: disabled,
        label: label,
        value: value,
        isLeaf: isMergedLeaf,
        isLoading: isLoading,
        checked: checked,
        halfChecked: halfChecked,
        option: option,
        fullPath: fullPath,
        fullPathKey: fullPathKey
      };
    });
  }, [options, checkedSet, fieldNames, halfCheckedSet, loadingKeys, prevValuePath]); // ============================ Render ============================

  return /*#__PURE__*/_jsx("ul", {
    className: menuPrefixCls,
    role: "menu",
    children: optionInfoList.map(function (_ref2) {
      var _classNames;

      var disabled = _ref2.disabled,
          label = _ref2.label,
          value = _ref2.value,
          isMergedLeaf = _ref2.isLeaf,
          isLoading = _ref2.isLoading,
          checked = _ref2.checked,
          halfChecked = _ref2.halfChecked,
          option = _ref2.option,
          fullPath = _ref2.fullPath,
          fullPathKey = _ref2.fullPathKey;

      // >>>>> Open
      var triggerOpenPath = function triggerOpenPath() {
        if (!disabled && (!hoverOpen || !isMergedLeaf)) {
          onActive(fullPath);
        }
      }; // >>>>> Selection


      var triggerSelect = function triggerSelect() {
        if (isSelectable(option)) {
          onSelect(fullPath, isMergedLeaf);
        }
      }; // >>>>> Title


      var title;

      if (typeof option.title === 'string') {
        title = option.title;
      } else if (typeof label === 'string') {
        title = label;
      } // >>>>> Render


      return /*#__PURE__*/_jsxs("li", {
        className: classNames(menuItemPrefixCls, (_classNames = {}, _defineProperty(_classNames, "".concat(menuItemPrefixCls, "-expand"), !isMergedLeaf), _defineProperty(_classNames, "".concat(menuItemPrefixCls, "-active"), activeValue === value), _defineProperty(_classNames, "".concat(menuItemPrefixCls, "-disabled"), disabled), _defineProperty(_classNames, "".concat(menuItemPrefixCls, "-loading"), isLoading), _classNames)),
        style: dropdownMenuColumnStyle,
        role: "menuitemcheckbox",
        title: title,
        "aria-checked": checked,
        "data-path-key": fullPathKey,
        onClick: function onClick() {
          triggerOpenPath();

          if (!multiple || isMergedLeaf) {
            triggerSelect();
          }
        },
        onDoubleClick: function onDoubleClick() {
          if (changeOnSelect) {
            onToggleOpen(false);
          }
        },
        onMouseEnter: function onMouseEnter() {
          if (hoverOpen) {
            triggerOpenPath();
          }
        },
        onMouseDown: function onMouseDown(e) {
          // Prevent selector from blurring
          e.preventDefault();
        },
        children: [multiple && /*#__PURE__*/_jsx(Checkbox, {
          prefixCls: "".concat(prefixCls, "-checkbox"),
          checked: checked,
          halfChecked: halfChecked,
          disabled: disabled,
          onClick: function onClick(e) {
            e.stopPropagation();
            triggerSelect();
          }
        }), /*#__PURE__*/_jsx("div", {
          className: "".concat(menuItemPrefixCls, "-content"),
          children: label
        }), !isLoading && expandIcon && !isMergedLeaf && /*#__PURE__*/_jsx("div", {
          className: "".concat(menuItemPrefixCls, "-expand-icon"),
          children: expandIcon
        }), isLoading && loadingIcon && /*#__PURE__*/_jsx("div", {
          className: "".concat(menuItemPrefixCls, "-loading-icon"),
          children: loadingIcon
        })]
      }, fullPathKey);
    })
  });
}