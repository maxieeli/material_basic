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

import { useMemo, useImperativeHandle } from 'react';
import { useBaseProps } from 'developerli/select';
import KeyCode from 'rc-util/lib/KeyCode';
import { SEARCH_MARK } from "../hooks/useSearchOptions";
export default (function (ref, options, fieldNames, activeValueCells, setActiveValueCells, onKeyBoardSelect) {
  var _useBaseProps = useBaseProps(),
      searchValue = _useBaseProps.searchValue,
      toggleOpen = _useBaseProps.toggleOpen,
      open = _useBaseProps.open;

  var _useMemo = useMemo(function () {
    var activeIndex = -1;
    var currentOptions = options;
    var mergedActiveIndexes = [];
    var mergedActiveValueCells = [];
    var len = activeValueCells.length; // Fill validate active value cells and index

    var _loop = function _loop(i) {
      // Mark the active index for current options
      var nextActiveIndex = currentOptions.findIndex(function (option) {
        return option[fieldNames.value] === activeValueCells[i];
      });

      if (nextActiveIndex === -1) {
        return "break";
      }

      activeIndex = nextActiveIndex;
      mergedActiveIndexes.push(activeIndex);
      mergedActiveValueCells.push(activeValueCells[i]);
      currentOptions = currentOptions[activeIndex][fieldNames.children];
    };

    for (var i = 0; i < len && currentOptions; i += 1) {
      var _ret = _loop(i);

      if (_ret === "break") break;
    } // Fill last active options


    var activeOptions = options;

    for (var _i2 = 0; _i2 < mergedActiveIndexes.length - 1; _i2 += 1) {
      activeOptions = activeOptions[mergedActiveIndexes[_i2]][fieldNames.children];
    }

    return [mergedActiveValueCells, activeIndex, activeOptions];
  }, [activeValueCells, fieldNames, options]),
      _useMemo2 = _slicedToArray(_useMemo, 3),
      validActiveValueCells = _useMemo2[0],
      lastActiveIndex = _useMemo2[1],
      lastActiveOptions = _useMemo2[2]; // Update active value cells and scroll to target element


  var internalSetActiveValueCells = function internalSetActiveValueCells(next) {
    setActiveValueCells(next);
  }; // Same options offset


  var offsetActiveOption = function offsetActiveOption(offset) {
    var len = lastActiveOptions.length;
    var currentIndex = lastActiveIndex;

    if (currentIndex === -1 && offset < 0) {
      currentIndex = len;
    }

    for (var i = 0; i < len; i += 1) {
      currentIndex = (currentIndex + offset + len) % len;
      var _option = lastActiveOptions[currentIndex];

      if (_option && !_option.disabled) {
        var value = _option[fieldNames.value];
        var nextActiveCells = validActiveValueCells.slice(0, -1).concat(value);
        internalSetActiveValueCells(nextActiveCells);
        return;
      }
    }
  }; // Different options offset


  var prevColumn = function prevColumn() {
    if (validActiveValueCells.length > 1) {
      var nextActiveCells = validActiveValueCells.slice(0, -1);
      internalSetActiveValueCells(nextActiveCells);
    } else {
      toggleOpen(false);
    }
  };

  var nextColumn = function nextColumn() {
    var _lastActiveOptions$la;

    var nextOptions = ((_lastActiveOptions$la = lastActiveOptions[lastActiveIndex]) === null || _lastActiveOptions$la === void 0 ? void 0 : _lastActiveOptions$la[fieldNames.children]) || [];
    var nextOption = nextOptions.find(function (option) {
      return !option.disabled;
    });

    if (nextOption) {
      var nextActiveCells = [].concat(_toConsumableArray(validActiveValueCells), [nextOption[fieldNames.value]]);
      internalSetActiveValueCells(nextActiveCells);
    }
  };

  useImperativeHandle(ref, function () {
    return {
      // scrollTo: treeRef.current?.scrollTo,
      onKeyDown: function onKeyDown(event) {
        var which = event.which;

        switch (which) {
          // >>> Arrow keys
          case KeyCode.UP:
          case KeyCode.DOWN:
            {
              var offset = 0;

              if (which === KeyCode.UP) {
                offset = -1;
              } else if (which === KeyCode.DOWN) {
                offset = 1;
              }

              if (offset !== 0) {
                offsetActiveOption(offset);
              }

              break;
            }

          case KeyCode.LEFT:
            {
              prevColumn();
              break;
            }

          case KeyCode.RIGHT:
            {
              nextColumn();
              break;
            }

          case KeyCode.BACKSPACE:
            {
              if (!searchValue) {
                prevColumn();
              }

              break;
            }
          // >>> Select

          case KeyCode.ENTER:
            {
              if (validActiveValueCells.length) {
                var _option2 = lastActiveOptions[lastActiveIndex]; // Search option should revert back of origin options

                var originOptions = (_option2 === null || _option2 === void 0 ? void 0 : _option2[SEARCH_MARK]) || [];

                if (originOptions.length) {
                  onKeyBoardSelect(originOptions.map(function (opt) {
                    return opt[fieldNames.value];
                  }), originOptions[originOptions.length - 1]);
                } else {
                  onKeyBoardSelect(validActiveValueCells, lastActiveOptions[lastActiveIndex]);
                }
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
      onKeyUp: function onKeyUp() {}
    };
  });
});