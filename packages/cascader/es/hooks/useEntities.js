function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { useRef, useCallback } from 'react';
import { convertDataToEntities } from 'developerli/tree/es/utils/treeUtil';
import { VALUE_SPLIT } from "../utils/commonUtil";

/** Lazy parse options data into conduct-able info to avoid perf issue in single mode */
export default (function (options, fieldNames) {
  var cacheRef = useRef({
    options: null,
    info: null
  });
  var getEntities = useCallback(function () {
    if (cacheRef.current.options !== options) {
      cacheRef.current.options = options;
      cacheRef.current.info = convertDataToEntities(options, {
        fieldNames: fieldNames,
        initWrapper: function initWrapper(wrapper) {
          return _objectSpread(_objectSpread({}, wrapper), {}, {
            pathKeyEntities: {}
          });
        },
        processEntity: function processEntity(entity, wrapper) {
          var pathKey = entity.nodes.map(function (node) {
            return node[fieldNames.value];
          }).join(VALUE_SPLIT);
          wrapper.pathKeyEntities[pathKey] = entity;
          entity.key = pathKey;
        }
      });
    }

    return cacheRef.current.info.pathKeyEntities;
  }, [fieldNames, options]);
  return getEntities;
});