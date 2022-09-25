function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

import { useMemo, isValidElement, cloneElement } from 'react';
import { toPathOptions } from "../utils/treeUtil";
import { toPathKey } from "../utils/commonUtil";
export default (function (rawValues, options, fieldNames, multiple, displayRender) {
  return useMemo(function () {
    var mergedDisplayRender = displayRender || // Default displayRender
    function (labels) {
      var mergedLabels = multiple ? labels.slice(-1) : labels;
      var SPLIT = ' / ';

      if (mergedLabels.every(function (label) {
        return ['string', 'number'].includes(_typeof(label));
      })) {
        return mergedLabels.join(SPLIT);
      } // If exist non-string value, use ReactNode instead


      return mergedLabels.reduce(function (list, label, index) {
        var keyedLabel = /*#__PURE__*/isValidElement(label) ? /*#__PURE__*/cloneElement(label, {
          key: index
        }) : label;

        if (index === 0) {
          return [keyedLabel];
        }

        return [].concat(_toConsumableArray(list), [SPLIT, keyedLabel]);
      }, []);
    };

    return rawValues.map(function (valueCells) {
      var _valueOptions, _valueOptions$option;

      var valueOptions = toPathOptions(valueCells, options, fieldNames);
      var label = mergedDisplayRender(valueOptions.map(function (_ref) {
        var _option$fieldNames$la;

        var option = _ref.option,
            value = _ref.value;
        return (_option$fieldNames$la = option === null || option === void 0 ? void 0 : option[fieldNames.label]) !== null && _option$fieldNames$la !== void 0 ? _option$fieldNames$la : value;
      }), valueOptions.map(function (_ref2) {
        var option = _ref2.option;
        return option;
      }));
      var value = toPathKey(valueCells);
      return {
        label: label,
        value: value,
        key: value,
        valueCells: valueCells,
        disabled: (_valueOptions = valueOptions[valueOptions.length - 1]) === null || _valueOptions === void 0 ? void 0 : (_valueOptions$option = _valueOptions.option) === null || _valueOptions$option === void 0 ? void 0 : _valueOptions$option.disabled
      };
    });
  }, [rawValues, options, fieldNames, displayRender, multiple]);
});