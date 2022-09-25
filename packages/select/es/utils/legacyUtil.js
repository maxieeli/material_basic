var _excluded = ["children", "value"],
    _excluded2 = ["children"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import { isValidElement } from 'react';
import toArray from 'rc-util/lib/Children/toArray';

function convertNodeToOption(node) {
  var _ref = node,
      key = _ref.key,
      _ref$props = _ref.props,
      children = _ref$props.children,
      value = _ref$props.value,
      restProps = _objectWithoutProperties(_ref$props, _excluded);

  return _objectSpread({
    key: key,
    value: value !== undefined ? value : key,
    children: children
  }, restProps);
}

export function convertChildrenToData(nodes) {
  var optionOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return toArray(nodes).map(function (node, index) {
    if (! /*#__PURE__*/isValidElement(node) || !node.type) {
      return null;
    }

    var _ref2 = node,
        isSelectOptGroup = _ref2.type.isSelectOptGroup,
        key = _ref2.key,
        _ref2$props = _ref2.props,
        children = _ref2$props.children,
        restProps = _objectWithoutProperties(_ref2$props, _excluded2);

    if (optionOnly || !isSelectOptGroup) {
      return convertNodeToOption(node);
    }

    return _objectSpread(_objectSpread({
      key: "__BASIC_SELECT_GRP__".concat(key === null ? index : key, "__"),
      label: key
    }, restProps), {}, {
      options: convertChildrenToData(children)
    });
  }).filter(function (data) {
    return data;
  });
}