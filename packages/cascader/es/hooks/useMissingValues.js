import { useCallback } from 'react';
import { toPathOptions } from "../utils/treeUtil";
export default (function (options, fieldNames) {
  return useCallback(function (rawValues) {
    var missingValues = [];
    var existsValues = [];
    rawValues.forEach(function (valueCell) {
      var pathOptions = toPathOptions(valueCell, options, fieldNames);

      if (pathOptions.every(function (opt) {
        return opt.option;
      })) {
        existsValues.push(valueCell);
      } else {
        missingValues.push(valueCell);
      }
    });
    return [existsValues, missingValues];
  }, [options, fieldNames]);
});