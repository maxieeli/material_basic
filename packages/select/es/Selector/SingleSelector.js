function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { useState, useEffect } from 'react';
import pickAttrs from 'rc-util/lib/pickAttrs';
import Input from "./Input";
import { getTitle } from "../utils/commonUtil";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var SingleSelector = function SingleSelector(props) {
  var inputElement = props.inputElement,
      prefixCls = props.prefixCls,
      id = props.id,
      inputRef = props.inputRef,
      disabled = props.disabled,
      autoFocus = props.autoFocus,
      autoComplete = props.autoComplete,
      activeDescendantId = props.activeDescendantId,
      mode = props.mode,
      open = props.open,
      values = props.values,
      placeholder = props.placeholder,
      tabIndex = props.tabIndex,
      showSearch = props.showSearch,
      searchValue = props.searchValue,
      activeValue = props.activeValue,
      maxLength = props.maxLength,
      onInputKeyDown = props.onInputKeyDown,
      onInputMouseDown = props.onInputMouseDown,
      onInputChange = props.onInputChange,
      onInputPaste = props.onInputPaste,
      onInputCompositionStart = props.onInputCompositionStart,
      onInputCompositionEnd = props.onInputCompositionEnd;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      inputChanged = _useState2[0],
      setInputChanged = _useState2[1];

  var combobox = mode === 'combobox';
  var inputEditable = combobox || showSearch;
  var item = values[0];
  var inputValue = searchValue || '';

  if (combobox && activeValue && !inputChanged) {
    inputValue = activeValue;
  }

  useEffect(function () {
    if (combobox) {
      setInputChanged(false);
    }
  }, [combobox, activeValue]); // Not show text when closed expect combobox mode

  var hasTextInput = mode !== 'combobox' && !open && !showSearch ? false : !!inputValue; // Get title

  var title = getTitle(item);

  var renderPlaceholder = function renderPlaceholder() {
    if (item) {
      return null;
    }

    var hiddenStyle = hasTextInput ? {
      visibility: 'hidden'
    } : undefined;
    return /*#__PURE__*/_jsx("span", {
      className: "".concat(prefixCls, "-selection-placeholder"),
      style: hiddenStyle,
      children: placeholder
    });
  };

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx("span", {
      className: "".concat(prefixCls, "-selection-search"),
      children: /*#__PURE__*/_jsx(Input, {
        ref: inputRef,
        prefixCls: prefixCls,
        id: id,
        open: open,
        inputElement: inputElement,
        disabled: disabled,
        autoFocus: autoFocus,
        autoComplete: autoComplete,
        editable: inputEditable,
        activeDescendantId: activeDescendantId,
        value: inputValue,
        onKeyDown: onInputKeyDown,
        onMouseDown: onInputMouseDown,
        onChange: function onChange(e) {
          setInputChanged(true);
          onInputChange(e);
        },
        onPaste: onInputPaste,
        onCompositionStart: onInputCompositionStart,
        onCompositionEnd: onInputCompositionEnd,
        tabIndex: tabIndex,
        attrs: pickAttrs(props, true),
        maxLength: combobox ? maxLength : undefined
      })
    }), !combobox && item && !hasTextInput && /*#__PURE__*/_jsx("span", {
      className: "".concat(prefixCls, "-selection-item"),
      title: title,
      children: item.label
    }), renderPlaceholder()]
  });
};

export default SingleSelector;