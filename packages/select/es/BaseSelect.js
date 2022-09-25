var _excluded = ["id", "prefixCls", "className", "showSearch", "tagRender", "omitDomProps", "label", "displayValues", "onDisplayValuesChange", "emptyOptions", "notFoundContent", "onClear", "mode", "disabled", "loading", "getInputElement", "getRawInputElement", "open", "defaultOpen", "onDropdownVisibleChange", "activeValue", "onActiveValueChange", "activeDescendantId", "searchValue", "onSearch", "onSearchSplit", "tokenSeparators", "allowClear", "showArrow", "inputIcon", "clearIcon", "OptionList", "animation", "transitionName", "dropdownStyle", "dropdownClassName", "dropdownMatchSelectWidth", "dropdownRender", "dropdownAlign", "placement", "getPopupContainer", "showAction", "onFocus", "onBlur", "onKeyUp", "onKeyDown", "onMouseDown"];

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import * as React from 'react';
import classNames from 'classnames';
import KeyCode from 'rc-util/lib/KeyCode';
import isMobile from 'rc-util/lib/isMobile';
import { useComposeRef } from 'rc-util/lib/ref';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import useLayoutEffect from 'rc-util/lib/hooks/useLayoutEffect';
import { getSeparatedContent } from "./utils/valueUtil";
import SelectTrigger from "./SelectTrigger";
import Selector from "./Selector";
import useSelectTriggerControl from "./hooks/useSelectTriggerControl";
import useDelayReset from "./hooks/useDelayReset";
import TransBtn from "./TransBtn";
import useLock from "./hooks/useLock";
import { BaseSelectContext } from "./hooks/useBaseProps";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var DEFAULT_OMIT_PROPS = ['value', 'onChange', 'removeIcon', 'placeholder', 'autoFocus', 'maxTagCount', 'maxTagTextLength', 'maxTagPlaceholder', 'choiceTransitionName', 'onInputKeyDown', 'onPopupScroll', 'tabIndex'];
export function isMultiple(mode) {
  return mode === 'tags' || mode === 'multiple';
}
var BaseSelect = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _customizeRawInputEle, _classNames2;

  var id = props.id,
      prefixCls = props.prefixCls,
      className = props.className,
      showSearch = props.showSearch,
      tagRender = props.tagRender,
      omitDomProps = props.omitDomProps,
      label = props.label,
      displayValues = props.displayValues,
      onDisplayValuesChange = props.onDisplayValuesChange,
      emptyOptions = props.emptyOptions,
      _props$notFoundConten = props.notFoundContent,
      notFoundContent = _props$notFoundConten === void 0 ? 'Not Found' : _props$notFoundConten,
      onClear = props.onClear,
      mode = props.mode,
      disabled = props.disabled,
      loading = props.loading,
      getInputElement = props.getInputElement,
      getRawInputElement = props.getRawInputElement,
      open = props.open,
      defaultOpen = props.defaultOpen,
      onDropdownVisibleChange = props.onDropdownVisibleChange,
      activeValue = props.activeValue,
      onActiveValueChange = props.onActiveValueChange,
      activeDescendantId = props.activeDescendantId,
      searchValue = props.searchValue,
      onSearch = props.onSearch,
      onSearchSplit = props.onSearchSplit,
      tokenSeparators = props.tokenSeparators,
      allowClear = props.allowClear,
      showArrow = props.showArrow,
      inputIcon = props.inputIcon,
      clearIcon = props.clearIcon,
      OptionList = props.OptionList,
      animation = props.animation,
      transitionName = props.transitionName,
      dropdownStyle = props.dropdownStyle,
      dropdownClassName = props.dropdownClassName,
      dropdownMatchSelectWidth = props.dropdownMatchSelectWidth,
      dropdownRender = props.dropdownRender,
      dropdownAlign = props.dropdownAlign,
      placement = props.placement,
      getPopupContainer = props.getPopupContainer,
      _props$showAction = props.showAction,
      showAction = _props$showAction === void 0 ? [] : _props$showAction,
      onFocus = props.onFocus,
      onBlur = props.onBlur,
      onKeyUp = props.onKeyUp,
      onKeyDown = props.onKeyDown,
      onMouseDown = props.onMouseDown,
      restProps = _objectWithoutProperties(props, _excluded); // ============================== MISC ==============================


  var multiple = isMultiple(mode);
  var mergedShowSearch = (showSearch !== undefined ? showSearch : multiple) || mode === 'combobox';

  var domProps = _objectSpread({}, restProps);

  DEFAULT_OMIT_PROPS.forEach(function (propName) {
    delete domProps[propName];
  });
  omitDomProps === null || omitDomProps === void 0 ? void 0 : omitDomProps.forEach(function (propName) {
    delete domProps[propName];
  }); // ============================= Mobile =============================

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      mobile = _React$useState2[0],
      setMobile = _React$useState2[1];

  React.useEffect(function () {
    // Only update on the client side
    setMobile(isMobile());
  }, []); // ============================== Refs ==============================

  var containerRef = React.useRef(null);
  var selectorDomRef = React.useRef(null);
  var triggerRef = React.useRef(null);
  var selectorRef = React.useRef(null);
  var listRef = React.useRef(null);
  /** Used for component focused management */

  var _useDelayReset = useDelayReset(),
      _useDelayReset2 = _slicedToArray(_useDelayReset, 3),
      mockFocused = _useDelayReset2[0],
      setMockFocused = _useDelayReset2[1],
      cancelSetMockFocused = _useDelayReset2[2]; // =========================== Imperative ===========================


  React.useImperativeHandle(ref, function () {
    var _selectorRef$current, _selectorRef$current2;

    return {
      focus: (_selectorRef$current = selectorRef.current) === null || _selectorRef$current === void 0 ? void 0 : _selectorRef$current.focus,
      blur: (_selectorRef$current2 = selectorRef.current) === null || _selectorRef$current2 === void 0 ? void 0 : _selectorRef$current2.blur,
      scrollTo: function scrollTo(arg) {
        var _listRef$current;

        return (_listRef$current = listRef.current) === null || _listRef$current === void 0 ? void 0 : _listRef$current.scrollTo(arg);
      }
    };
  }); // ========================== Search Value ==========================

  var mergedSearchValue = React.useMemo(function () {
    var _displayValues$;

    if (mode !== 'combobox') {
      return searchValue;
    }

    var val = (_displayValues$ = displayValues[0]) === null || _displayValues$ === void 0 ? void 0 : _displayValues$.value;
    return typeof val === 'string' || typeof val === 'number' ? String(val) : '';
  }, [searchValue, mode, displayValues]); // ========================== Custom Input ==========================
  // Only works in `combobox`

  var customizeInputElement = mode === 'combobox' && typeof getInputElement === 'function' && getInputElement() || null; // Used for customize replacement for `rc-cascader`

  var customizeRawInputElement = typeof getRawInputElement === 'function' && getRawInputElement();
  var customizeRawInputRef = useComposeRef(selectorDomRef, customizeRawInputElement === null || customizeRawInputElement === void 0 ? void 0 : (_customizeRawInputEle = customizeRawInputElement.props) === null || _customizeRawInputEle === void 0 ? void 0 : _customizeRawInputEle.ref); // ============================== Open ==============================

  var _useMergedState = useMergedState(undefined, {
    defaultValue: defaultOpen,
    value: open
  }),
      _useMergedState2 = _slicedToArray(_useMergedState, 2),
      innerOpen = _useMergedState2[0],
      setInnerOpen = _useMergedState2[1];

  var mergedOpen = innerOpen; // Not trigger `open` in `combobox` when `notFoundContent` is empty

  var emptyListContent = !notFoundContent && emptyOptions;

  if (disabled || emptyListContent && mergedOpen && mode === 'combobox') {
    mergedOpen = false;
  }

  var triggerOpen = emptyListContent ? false : mergedOpen;
  var onToggleOpen = React.useCallback(function (newOpen) {
    var nextOpen = newOpen !== undefined ? newOpen : !mergedOpen;

    if (mergedOpen !== nextOpen && !disabled) {
      setInnerOpen(nextOpen);
      onDropdownVisibleChange === null || onDropdownVisibleChange === void 0 ? void 0 : onDropdownVisibleChange(nextOpen);
    }
  }, [disabled, mergedOpen, setInnerOpen, onDropdownVisibleChange]); // ============================= Search =============================

  var tokenWithEnter = React.useMemo(function () {
    return (tokenSeparators || []).some(function (tokenSeparator) {
      return ['\n', '\r\n'].includes(tokenSeparator);
    });
  }, [tokenSeparators]);

  var onInternalSearch = function onInternalSearch(searchText, fromTyping, isCompositing) {
    var ret = true;
    var newSearchText = searchText;
    onActiveValueChange === null || onActiveValueChange === void 0 ? void 0 : onActiveValueChange(null); // Check if match the `tokenSeparators`

    var patchLabels = isCompositing ? null : getSeparatedContent(searchText, tokenSeparators); // Ignore combobox since it's not split-able

    if (mode !== 'combobox' && patchLabels) {
      newSearchText = '';
      onSearchSplit === null || onSearchSplit === void 0 ? void 0 : onSearchSplit(patchLabels); // Should close when paste finish

      onToggleOpen(false); // Tell Selector that break next actions

      ret = false;
    }

    if (onSearch && mergedSearchValue !== newSearchText) {
      onSearch(newSearchText, {
        source: fromTyping ? 'typing' : 'effect'
      });
    }

    return ret;
  }; // Only triggered when menu is closed & mode is tags
  // If menu is open, OptionList will take charge
  // If mode isn't tags, press enter is not meaningful when you can't see any option


  var onInternalSearchSubmit = function onInternalSearchSubmit(searchText) {
    // prevent empty tags from appearing when you click the Enter button
    if (!searchText || !searchText.trim()) {
      return;
    }

    onSearch(searchText, {
      source: 'submit'
    });
  }; // Close will clean up single mode search text


  React.useEffect(function () {
    if (!mergedOpen && !multiple && mode !== 'combobox') {
      onInternalSearch('', false, false);
    }
  }, [mergedOpen]); // ============================ Disabled ============================
  // Close dropdown & remove focus state when disabled change

  React.useEffect(function () {
    if (innerOpen && disabled) {
      setInnerOpen(false);
    }

    if (disabled) {
      setMockFocused(false);
    }
  }, [disabled]); // ============================ Keyboard ============================

  /**
   * We record input value here to check if can press to clean up by backspace
   * - null: Key is not down, this is reset by key up
   * - true: Search text is empty when first time backspace down
   * - false: Search text is not empty when first time backspace down
   */

  var _useLock = useLock(),
      _useLock2 = _slicedToArray(_useLock, 2),
      getClearLock = _useLock2[0],
      setClearLock = _useLock2[1]; // KeyDown


  var onInternalKeyDown = function onInternalKeyDown(event) {
    var clearLock = getClearLock();
    var which = event.which;

    if (which === KeyCode.ENTER) {
      // Do not submit form when type in the input
      if (mode !== 'combobox') {
        event.preventDefault();
      } // We only manage open state here, close logic should handle by list component


      if (!mergedOpen) {
        onToggleOpen(true);
      }
    }

    setClearLock(!!mergedSearchValue); // Remove value by `backspace`

    if (which === KeyCode.BACKSPACE && !clearLock && multiple && !mergedSearchValue && displayValues.length) {
      var cloneDisplayValues = _toConsumableArray(displayValues);

      var removedDisplayValue = null;

      for (var i = cloneDisplayValues.length - 1; i >= 0; i -= 1) {
        var current = cloneDisplayValues[i];

        if (!current.disabled) {
          cloneDisplayValues.splice(i, 1);
          removedDisplayValue = current;
          break;
        }
      }

      if (removedDisplayValue) {
        onDisplayValuesChange(cloneDisplayValues, {
          type: 'remove',
          values: [removedDisplayValue]
        });
      }
    }

    for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    if (mergedOpen && listRef.current) {
      var _listRef$current2;

      (_listRef$current2 = listRef.current).onKeyDown.apply(_listRef$current2, [event].concat(rest));
    }

    onKeyDown === null || onKeyDown === void 0 ? void 0 : onKeyDown.apply(void 0, [event].concat(rest));
  }; // KeyUp


  var onInternalKeyUp = function onInternalKeyUp(event) {
    for (var _len2 = arguments.length, rest = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      rest[_key2 - 1] = arguments[_key2];
    }

    if (mergedOpen && listRef.current) {
      var _listRef$current3;

      (_listRef$current3 = listRef.current).onKeyUp.apply(_listRef$current3, [event].concat(rest));
    }

    onKeyUp === null || onKeyUp === void 0 ? void 0 : onKeyUp.apply(void 0, [event].concat(rest));
  }; // ============================ Selector ============================


  var onSelectorRemove = function onSelectorRemove(val) {
    var newValues = displayValues.filter(function (i) {
      return i !== val;
    });
    onDisplayValuesChange(newValues, {
      type: 'remove',
      values: [val]
    });
  }; // ========================== Focus / Blur ==========================

  /** Record real focus status */


  var focusRef = React.useRef(false);

  var onContainerFocus = function onContainerFocus() {
    setMockFocused(true);

    if (!disabled) {
      if (onFocus && !focusRef.current) {
        onFocus.apply(void 0, arguments);
      } // `showAction` should handle `focus` if set


      if (showAction.includes('focus')) {
        onToggleOpen(true);
      }
    }

    focusRef.current = true;
  };

  var onContainerBlur = function onContainerBlur() {
    setMockFocused(false, function () {
      focusRef.current = false;
      onToggleOpen(false);
    });

    if (disabled) {
      return;
    }

    if (mergedSearchValue) {
      // `tags` mode should move `searchValue` into values
      if (mode === 'tags') {
        onSearch(mergedSearchValue, {
          source: 'submit'
        });
      } else if (mode === 'multiple') {
        // `multiple` mode only clean the search value but not trigger event
        onSearch('', {
          source: 'blur'
        });
      }
    }

    if (onBlur) {
      onBlur.apply(void 0, arguments);
    }
  }; // Give focus back of Select


  var activeTimeoutIds = [];
  React.useEffect(function () {
    return function () {
      activeTimeoutIds.forEach(function (timeoutId) {
        return clearTimeout(timeoutId);
      });
      activeTimeoutIds.splice(0, activeTimeoutIds.length);
    };
  }, []);

  var onInternalMouseDown = function onInternalMouseDown(event) {
    var _triggerRef$current;

    var target = event.target;
    var popupElement = (_triggerRef$current = triggerRef.current) === null || _triggerRef$current === void 0 ? void 0 : _triggerRef$current.getPopupElement(); // We should give focus back to selector if clicked item is not focusable

    if (popupElement && popupElement.contains(target)) {
      var timeoutId = setTimeout(function () {
        var index = activeTimeoutIds.indexOf(timeoutId);

        if (index !== -1) {
          activeTimeoutIds.splice(index, 1);
        }

        cancelSetMockFocused();

        if (!mobile && !popupElement.contains(document.activeElement)) {
          var _selectorRef$current3;

          (_selectorRef$current3 = selectorRef.current) === null || _selectorRef$current3 === void 0 ? void 0 : _selectorRef$current3.focus();
        }
      });
      activeTimeoutIds.push(timeoutId);
    }

    for (var _len3 = arguments.length, restArgs = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      restArgs[_key3 - 1] = arguments[_key3];
    }

    onMouseDown === null || onMouseDown === void 0 ? void 0 : onMouseDown.apply(void 0, [event].concat(restArgs));
  }; // ============================ Dropdown ============================


  var _React$useState3 = React.useState(null),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      containerWidth = _React$useState4[0],
      setContainerWidth = _React$useState4[1];

  var _React$useState5 = React.useState({}),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      forceUpdate = _React$useState6[1]; // We need force update here since popup dom is render async


  function onPopupMouseEnter() {
    forceUpdate({});
  }

  useLayoutEffect(function () {
    if (triggerOpen) {
      var _containerRef$current;

      var newWidth = Math.ceil((_containerRef$current = containerRef.current) === null || _containerRef$current === void 0 ? void 0 : _containerRef$current.offsetWidth);

      if (containerWidth !== newWidth && !Number.isNaN(newWidth)) {
        setContainerWidth(newWidth);
      }
    }
  }, [triggerOpen]); // Used for raw custom input trigger

  var onTriggerVisibleChange;

  if (customizeRawInputElement) {
    onTriggerVisibleChange = function onTriggerVisibleChange(newOpen) {
      onToggleOpen(newOpen);
    };
  } // Close when click on non-select element


  useSelectTriggerControl(function () {
    var _triggerRef$current2;

    return [containerRef.current, (_triggerRef$current2 = triggerRef.current) === null || _triggerRef$current2 === void 0 ? void 0 : _triggerRef$current2.getPopupElement()];
  }, triggerOpen, onToggleOpen, !!customizeRawInputElement); // ============================ Context =============================

  var baseSelectContext = React.useMemo(function () {
    return _objectSpread(_objectSpread({}, props), {}, {
      notFoundContent: notFoundContent,
      open: mergedOpen,
      triggerOpen: triggerOpen,
      id: id,
      showSearch: mergedShowSearch,
      multiple: multiple,
      toggleOpen: onToggleOpen
    });
  }, [props, notFoundContent, triggerOpen, mergedOpen, id, mergedShowSearch, multiple, onToggleOpen]); // ==================================================================
  // ==                            Render                            ==
  // ==================================================================
  // ============================= Arrow ==============================

  var mergedShowArrow = showArrow !== undefined ? showArrow : loading || !multiple && mode !== 'combobox';
  var arrowNode;

  if (mergedShowArrow) {
    arrowNode = /*#__PURE__*/_jsx(TransBtn, {
      className: classNames("".concat(prefixCls, "-arrow"), _defineProperty({}, "".concat(prefixCls, "-arrow-loading"), loading)),
      customizeIcon: inputIcon,
      customizeIconProps: {
        loading: loading,
        searchValue: mergedSearchValue,
        open: mergedOpen,
        focused: mockFocused,
        showSearch: mergedShowSearch
      }
    });
  } // ============================= Clear ==============================


  var clearNode;

  var onClearMouseDown = function onClearMouseDown() {
    onClear === null || onClear === void 0 ? void 0 : onClear();
    onDisplayValuesChange([], {
      type: 'clear',
      values: displayValues
    });
    onInternalSearch('', false, false);
  };

  if (!disabled && allowClear && (displayValues.length || mergedSearchValue) && !(mode === 'combobox' && mergedSearchValue === '')) {
    clearNode = /*#__PURE__*/_jsx(TransBtn, {
      className: "".concat(prefixCls, "-clear"),
      onMouseDown: onClearMouseDown,
      customizeIcon: clearIcon,
      children: "\xD7"
    });
  } // =========================== OptionList ===========================


  var optionList = /*#__PURE__*/_jsx(OptionList, {
    ref: listRef
  }); // ============================= Select =============================


  var mergedClassName = classNames(prefixCls, className, (_classNames2 = {}, _defineProperty(_classNames2, "".concat(prefixCls, "-focused"), mockFocused), _defineProperty(_classNames2, "".concat(prefixCls, "-multiple"), multiple), _defineProperty(_classNames2, "".concat(prefixCls, "-single"), !multiple), _defineProperty(_classNames2, "".concat(prefixCls, "-allow-clear"), allowClear), _defineProperty(_classNames2, "".concat(prefixCls, "-show-arrow"), mergedShowArrow), _defineProperty(_classNames2, "".concat(prefixCls, "-disabled"), disabled), _defineProperty(_classNames2, "".concat(prefixCls, "-loading"), loading), _defineProperty(_classNames2, "".concat(prefixCls, "-open"), mergedOpen), _defineProperty(_classNames2, "".concat(prefixCls, "-customize-input"), customizeInputElement), _defineProperty(_classNames2, "".concat(prefixCls, "-show-search"), mergedShowSearch), _defineProperty(_classNames2, "".concat(prefixCls, "-shrink"), label && (mockFocused || displayValues.length)), _classNames2)); // >>> Selector

  var selectorNode = /*#__PURE__*/_jsx(SelectTrigger, {
    ref: triggerRef,
    disabled: disabled,
    prefixCls: prefixCls,
    visible: triggerOpen,
    popupElement: optionList,
    containerWidth: containerWidth,
    animation: animation,
    transitionName: transitionName,
    dropdownStyle: dropdownStyle,
    dropdownClassName: dropdownClassName,
    dropdownMatchSelectWidth: dropdownMatchSelectWidth,
    dropdownRender: dropdownRender,
    dropdownAlign: dropdownAlign,
    placement: placement,
    getPopupContainer: getPopupContainer,
    empty: emptyOptions,
    getTriggerDOMNode: function getTriggerDOMNode() {
      return selectorDomRef.current;
    },
    onPopupVisibleChange: onTriggerVisibleChange,
    onPopupMouseEnter: onPopupMouseEnter,
    children: customizeRawInputElement ? /*#__PURE__*/React.cloneElement(customizeRawInputElement, {
      ref: customizeRawInputRef
    }) : /*#__PURE__*/_jsx(Selector, _objectSpread(_objectSpread({}, props), {}, {
      domRef: selectorDomRef,
      prefixCls: prefixCls,
      inputElement: customizeInputElement,
      ref: selectorRef,
      id: id,
      showSearch: mergedShowSearch,
      mode: mode,
      activeDescendantId: activeDescendantId,
      tagRender: tagRender,
      values: displayValues,
      open: mergedOpen,
      onToggleOpen: onToggleOpen,
      activeValue: activeValue,
      searchValue: mergedSearchValue,
      onSearch: onInternalSearch,
      onSearchSubmit: onInternalSearchSubmit,
      onRemove: onSelectorRemove,
      tokenWithEnter: tokenWithEnter
    }))
  }); // >>> Render


  var renderNode; // Render raw

  if (customizeRawInputElement) {
    renderNode = selectorNode;
  } else {
    renderNode = /*#__PURE__*/_jsxs("div", _objectSpread(_objectSpread({
      className: mergedClassName
    }, domProps), {}, {
      ref: containerRef,
      onMouseDown: onInternalMouseDown,
      onKeyDown: onInternalKeyDown,
      onKeyUp: onInternalKeyUp,
      onFocus: onContainerFocus,
      onBlur: onContainerBlur,
      children: [label && /*#__PURE__*/_jsx("label", {
        className: "".concat(prefixCls, "-label"),
        children: label
      }), mockFocused && !mergedOpen && /*#__PURE__*/_jsx("span", {
        style: {
          width: 0,
          height: 0,
          position: 'absolute',
          overflow: 'hidden',
          opacity: 0
        },
        "aria-live": "polite",
        children: "".concat(displayValues.map(function (_ref) {
          var label = _ref.label,
              value = _ref.value;
          return ['number', 'string'].includes(_typeof(label)) ? label : value;
        }).join(', '))
      }), selectorNode, arrowNode, clearNode, /*#__PURE__*/_jsx("fieldset", {
        className: "".concat(prefixCls, "-outlined"),
        children: /*#__PURE__*/_jsx("legend", {
          "aria-hidden": "true",
          children: label ? /*#__PURE__*/_jsx("span", {
            children: label
          }) : /*#__PURE__*/_jsx("span", {
            children: "&ZeroWidthSpace"
          })
        })
      })]
    }));
  }

  return /*#__PURE__*/_jsx(BaseSelectContext.Provider, {
    value: baseSelectContext,
    children: renderNode
  });
});
BaseSelect.displayName = 'BaseSelect';
export default BaseSelect;