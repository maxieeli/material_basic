var _excluded = ["disabled", "title", "children", "style", "className"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

import { useEffect, useContext, useRef, useState, useCallback, useImperativeHandle, forwardRef, isValidElement } from 'react';
import KeyCode from 'rc-util/lib/KeyCode';
import omit from 'rc-util/lib/omit';
import pickAttrs from 'rc-util/lib/pickAttrs';
import useMemo from 'rc-util/lib/hooks/useMemo';
import classNames from 'classnames';
import List from 'rc-virtual-list';
import TransBtn from "./TransBtn";
import useBaseProps from "./hooks/useBaseProps";
import SelectContext from "./SelectContext";
import { jsx as _jsx } from "react/jsx-runtime";
import { createElement as _createElement } from "react";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

function isTitleType(content) {
  return typeof content === 'string' || typeof content === 'number';
}
/**
 * Using virtual list of option display.
 * Will fallback to dom if use customize render.
 */


var OptionList = function OptionList(_, ref) {
  var _useBaseProps = useBaseProps(),
      prefixCls = _useBaseProps.prefixCls,
      id = _useBaseProps.id,
      open = _useBaseProps.open,
      multiple = _useBaseProps.multiple,
      mode = _useBaseProps.mode,
      searchValue = _useBaseProps.searchValue,
      toggleOpen = _useBaseProps.toggleOpen,
      notFoundContent = _useBaseProps.notFoundContent,
      onPopupScroll = _useBaseProps.onPopupScroll;

  var _useContext = useContext(SelectContext),
      flattenOptions = _useContext.flattenOptions,
      onActiveValue = _useContext.onActiveValue,
      defaultActiveFirstOption = _useContext.defaultActiveFirstOption,
      onSelect = _useContext.onSelect,
      menuItemSelectedIcon = _useContext.menuItemSelectedIcon,
      rawValues = _useContext.rawValues,
      fieldNames = _useContext.fieldNames,
      virtual = _useContext.virtual,
      listHeight = _useContext.listHeight,
      listItemHeight = _useContext.listItemHeight;

  var itemPrefixCls = "".concat(prefixCls, "-item");
  var memoFlattenOptions = useMemo(function () {
    return flattenOptions;
  }, [open, flattenOptions], function (prev, next) {
    return next[0] && prev[1] !== next[1];
  }); // =========================== List ===========================

  var listRef = useRef(null);

  var onListMouseDown = function onListMouseDown(event) {
    event.preventDefault();
  };

  var scrollIntoView = function scrollIntoView(args) {
    if (listRef.current) {
      listRef.current.scrollTo(typeof args === 'number' ? {
        index: args
      } : args);
    }
  }; // ========================== Active ==========================


  var getEnabledActiveIndex = function getEnabledActiveIndex(index) {
    var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var len = memoFlattenOptions.length;

    for (var i = 0; i < len; i += 1) {
      var current = (index + i * offset + len) % len;
      var _memoFlattenOptions$c = memoFlattenOptions[current],
          group = _memoFlattenOptions$c.group,
          data = _memoFlattenOptions$c.data;

      if (!group && !data.disabled) {
        return current;
      }
    }

    return -1;
  };

  var _useState = useState(function () {
    return getEnabledActiveIndex(0);
  }),
      _useState2 = _slicedToArray(_useState, 2),
      activeIndex = _useState2[0],
      setActiveIndex = _useState2[1];

  var setActive = function setActive(index) {
    var fromKeyboard = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    setActiveIndex(index);
    var info = {
      source: fromKeyboard ? 'keyboard' : 'mouse'
    }; // Trigger active event

    var flattenItem = memoFlattenOptions[index];

    if (!flattenItem) {
      onActiveValue(null, -1, info);
      return;
    }

    onActiveValue(flattenItem.value, index, info);
  }; // Auto active first item when list length or searchValue changed


  useEffect(function () {
    setActive(defaultActiveFirstOption !== false ? getEnabledActiveIndex(0) : -1);
  }, [memoFlattenOptions.length, searchValue]);
  var isSelected = useCallback(function (value) {
    return rawValues.has(value) && mode !== 'combobox';
  }, [mode, _toConsumableArray(rawValues).toString()]); // Auto scroll to item position in single mode

  useEffect(function () {
    /**
     * React will skip `onChange` when component update.
     * `setActive` function will call root accessibility state update which makes re-render.
     * So we need to delay to let Input component trigger onChange first.
     */
    var timeoutId = setTimeout(function () {
      if (!multiple && open && rawValues.size === 1) {
        var value = Array.from(rawValues)[0];
        var index = memoFlattenOptions.findIndex(function (_ref) {
          var data = _ref.data;
          return data.value === value;
        });

        if (index !== -1) {
          setActive(index);
          scrollIntoView(index);
        }
      }
    }); // Force trigger scrollbar visible when open

    if (open) {
      var _listRef$current;

      (_listRef$current = listRef.current) === null || _listRef$current === void 0 ? void 0 : _listRef$current.scrollTo(undefined);
    }

    return function () {
      return clearTimeout(timeoutId);
    };
  }, [open, searchValue]); // ========================== Values ==========================

  var onSelectValue = function onSelectValue(value) {
    if (value !== undefined) {
      onSelect(value, {
        selected: !rawValues.has(value)
      });
    } // Single mode should always close by select


    if (!multiple) {
      toggleOpen(false);
    }
  }; // ========================= Keyboard =========================


  useImperativeHandle(ref, function () {
    return {
      onKeyDown: function onKeyDown(event) {
        var which = event.which,
            ctrlKey = event.ctrlKey;

        switch (which) {
          // >>> Arrow keys & ctrl + n/p on Mac
          case KeyCode.N:
          case KeyCode.P:
          case KeyCode.UP:
          case KeyCode.DOWN:
            {
              var offset = 0;

              if (which === KeyCode.UP) {
                offset = -1;
              } else if (which === KeyCode.DOWN) {
                offset = 1;
              } else if (ctrlKey) {
                if (which === KeyCode.N) {
                  offset = 1;
                } else if (which === KeyCode.P) {
                  offset = -1;
                }
              }

              if (offset !== 0) {
                var nextActiveIndex = getEnabledActiveIndex(activeIndex + offset, offset);
                scrollIntoView(nextActiveIndex);
                setActive(nextActiveIndex, true);
              }

              break;
            }
          // >>> Select

          case KeyCode.ENTER:
            {
              // value
              var item = memoFlattenOptions[activeIndex];

              if (item && !item.data.disabled) {
                onSelectValue(item.value);
              } else {
                onSelectValue(undefined);
              }

              if (open) {
                event.preventDefault();
              }

              break;
            }
          // >>> Close

          case KeyCode.ESC:
            {
              toggleOpen(false);

              if (open) {
                event.stopPropagation();
              }
            }
        }
      },
      onKeyUp: function onKeyUp() {},
      scrollTo: function scrollTo(index) {
        scrollIntoView(index);
      }
    };
  }); // ========================== Render ==========================

  if (memoFlattenOptions.length === 0) {
    return /*#__PURE__*/_jsx("div", {
      role: "listbox",
      id: "".concat(id, "_list"),
      className: "".concat(itemPrefixCls, "-empty"),
      onMouseDown: onListMouseDown,
      children: notFoundContent
    });
  }

  var omitFieldNameList = Object.keys(fieldNames).map(function (key) {
    return fieldNames[key];
  });

  var getLabel = function getLabel(item) {
    return item.label;
  };

  var renderItem = function renderItem(index) {
    var item = memoFlattenOptions[index];
    if (!item) return null;
    var itemData = item.data || {};
    var value = itemData.value;
    var group = item.group;
    var attrs = pickAttrs(itemData, true);
    var mergedLabel = getLabel(item);
    return item ? /*#__PURE__*/_createElement("div", _objectSpread(_objectSpread({
      "aria-label": typeof mergedLabel === 'string' && !group ? mergedLabel : null
    }, attrs), {}, {
      key: index,
      role: group ? 'presentation' : 'option',
      id: "".concat(id, "_list_").concat(index),
      "aria-selected": isSelected(value)
    }), value) : null;
  };

  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs("div", {
      role: "listbox",
      id: "".concat(id, "_list"),
      style: {
        height: 0,
        width: 0,
        overflow: 'hidden'
      },
      children: [renderItem(activeIndex - 1), renderItem(activeIndex), renderItem(activeIndex + 1)]
    }), /*#__PURE__*/_jsx(List, {
      itemKey: "key",
      ref: listRef,
      data: memoFlattenOptions,
      height: listHeight,
      itemHeight: listItemHeight,
      fullHeight: false,
      onMouseDown: onListMouseDown,
      onScroll: onPopupScroll,
      virtual: virtual,
      children: function children(item, itemIndex) {
        var _classNames;

        var group = item.group,
            groupOption = item.groupOption,
            data = item.data,
            label = item.label,
            value = item.value;
        var key = data.key; // Group

        if (group) {
          var _data$title;

          var groupTitle = (_data$title = data.title) !== null && _data$title !== void 0 ? _data$title : isTitleType(label) ? label.toString() : undefined;
          return /*#__PURE__*/_jsx("div", {
            className: classNames(itemPrefixCls, "".concat(itemPrefixCls, "-group")),
            title: groupTitle,
            children: label !== undefined ? label : key
          });
        }

        var disabled = data.disabled,
            title = data.title,
            children = data.children,
            style = data.style,
            className = data.className,
            otherProps = _objectWithoutProperties(data, _excluded);

        var passedProps = omit(otherProps, omitFieldNameList); // Option

        var selected = isSelected(value);
        var optionPrefixCls = "".concat(itemPrefixCls, "-option");
        var optionClassName = classNames(itemPrefixCls, optionPrefixCls, className, (_classNames = {}, _defineProperty(_classNames, "".concat(optionPrefixCls, "-grouped"), groupOption), _defineProperty(_classNames, "".concat(optionPrefixCls, "-active"), activeIndex === itemIndex && !disabled), _defineProperty(_classNames, "".concat(optionPrefixCls, "-disabled"), disabled), _defineProperty(_classNames, "".concat(optionPrefixCls, "-selected"), selected), _classNames));
        var mergedLabel = getLabel(item);
        var iconVisible = !menuItemSelectedIcon || typeof menuItemSelectedIcon === 'function' || selected;
        var content = typeof mergedLabel === 'number' ? mergedLabel : mergedLabel || value;
        var optionTitle = isTitleType(content) ? content.toString() : undefined;

        if (title !== undefined) {
          optionTitle = title;
        }

        return /*#__PURE__*/_jsxs("div", _objectSpread(_objectSpread({}, pickAttrs(passedProps)), {}, {
          "aria-selected": selected,
          className: optionClassName,
          title: optionTitle,
          onMouseMove: function onMouseMove() {
            if (activeIndex === itemIndex || disabled) {
              return;
            }

            setActive(itemIndex);
          },
          onClick: function onClick() {
            if (!disabled) {
              onSelectValue(value);
            }
          },
          style: style,
          children: [/*#__PURE__*/_jsx("div", {
            className: "".concat(optionPrefixCls, "-content"),
            children: content
          }), /*#__PURE__*/isValidElement(menuItemSelectedIcon) || selected, iconVisible && /*#__PURE__*/_jsx(TransBtn, {
            className: "".concat(itemPrefixCls, "-option-state"),
            customizeIcon: menuItemSelectedIcon,
            customizeIconProps: {
              isSelected: selected
            },
            children: selected ? '✓' : null
          })]
        }));
      }
    })]
  });
};

var RefOptionList = /*#__PURE__*/forwardRef(OptionList);
RefOptionList.displayName = 'OptionList';
export default RefOptionList;