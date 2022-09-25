function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import { useMemo } from 'react';
export var SEARCH_MARK = '__basic_cascader_search_mark__';

var defaultFilter = function defaultFilter(search, options, _ref) {
  var label = _ref.label;
  return options.some(function (opt) {
    return String(opt[label]).toLowerCase().includes(search.toLowerCase());
  });
};

var defaultRender = function defaultRender(inputValue, path, prefixCls, fieldNames) {
  return path.map(function (opt) {
    return opt[fieldNames.label];
  }).join(' / ');
};

export default (function (search, options, fieldNames, prefixCls, config, changeOnSelect) {
  var _config$filter = config.filter,
      filter = _config$filter === void 0 ? defaultFilter : _config$filter,
      _config$render = config.render,
      render = _config$render === void 0 ? defaultRender : _config$render,
      _config$limit = config.limit,
      limit = _config$limit === void 0 ? 50 : _config$limit,
      sort = config.sort;
  return useMemo(function () {
    var filteredOptions = [];

    if (!search) {
      return [];
    }

    function dig(list, pathOptions) {
      list.forEach(function (option) {
        // Perf saving when `sort` is disabled and `limit` is provided
        if (!sort && limit > 0 && filteredOptions.length >= limit) {
          return;
        }

        var connectedPathOptions = [].concat(_toConsumableArray(pathOptions), [option]);
        var children = option[fieldNames.children]; // If current option is filterable

        if ( // If is leaf option
        !children || children.length === 0 || // If is changeOnSelect
        changeOnSelect) {
          if (filter(search, connectedPathOptions, {
            label: fieldNames.label
          })) {
            var _objectSpread2;

            filteredOptions.push(_objectSpread(_objectSpread({}, option), {}, (_objectSpread2 = {}, _defineProperty(_objectSpread2, fieldNames.label, render(search, connectedPathOptions, prefixCls, fieldNames)), _defineProperty(_objectSpread2, SEARCH_MARK, connectedPathOptions), _objectSpread2)));
          }
        }

        if (children) {
          dig(option[fieldNames.children], connectedPathOptions);
        }
      });
    }

    dig(options, []); // Do sort

    if (sort) {
      filteredOptions.sort(function (a, b) {
        return sort(a[SEARCH_MARK], b[SEARCH_MARK], search, fieldNames);
      });
    }

    return limit > 0 ? filteredOptions.slice(0, limit) : filteredOptions;
  }, [search, options, fieldNames, prefixCls, render, changeOnSelect, filter, sort, limit]);
});