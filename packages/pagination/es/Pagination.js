function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { Component, createElement, cloneElement, isValidElement } from 'react';
import classNames from 'classnames';
import Pager from "./Pager";
import Options from "./Options";
import LOCALE from "./locale/zh_CN";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { createElement as _createElement } from "react";
var KEYCODE = {
  ZERO: 48,
  NINE: 57,
  NUMPAD_ZERO: 96,
  NUMPAD_NINE: 105,
  BACKSPACE: 8,
  DELETE: 46,
  ENTER: 13,
  ARROW_UP: 38,
  ARROW_DOWN: 40
};

function noop() {}

function isInteger(v) {
  var value = Number(v);
  return (// eslint-disable-next-line no-restricted-globals
    typeof value === 'number' && !isNaN(value) && isFinite(value) && Math.floor(value) === value
  );
}

function defaultItemRender(page, type, element) {
  return element;
}

function calculatePage(p, state, props) {
  var pageSize = typeof p === 'undefined' ? state.pageSize : p;
  return Math.floor((props.total - 1) / pageSize) + 1;
}

var Pagination = /*#__PURE__*/function (_Component) {
  _inherits(Pagination, _Component);

  var _super = _createSuper(Pagination);

  function Pagination(props) {
    var _this;

    _classCallCheck(this, Pagination);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "getJumpPrevPage", function () {
      return Math.max(1, _this.state.current - (_this.props.showLessItems ? 3 : 5));
    });

    _defineProperty(_assertThisInitialized(_this), "getJumpNextPage", function () {
      return Math.min(calculatePage(undefined, _this.state, _this.props), _this.state.current + (_this.props.showLessItems ? 3 : 5));
    });

    _defineProperty(_assertThisInitialized(_this), "getItemIcon", function (icon, label) {
      var prefixCls = _this.props.prefixCls;

      var iconNode = icon || /*#__PURE__*/_jsx("button", {
        type: "button",
        "aria-label": label,
        className: "".concat(prefixCls, "-item-link")
      });

      if (typeof icon === 'function') {
        iconNode = /*#__PURE__*/createElement(icon, _objectSpread({}, _this.props));
      }

      return iconNode;
    });

    _defineProperty(_assertThisInitialized(_this), "savePaginationNode", function (node) {
      _this.paginationNode = node;
    });

    _defineProperty(_assertThisInitialized(_this), "isValid", function (page) {
      var total = _this.props.total;
      return isInteger(page) && page !== _this.state.current && isInteger(total) && total > 0;
    });

    _defineProperty(_assertThisInitialized(_this), "shouldDisplayQuickJumper", function () {
      var _this$props = _this.props,
          showQuickJumper = _this$props.showQuickJumper,
          total = _this$props.total;
      var pageSize = _this.state.pageSize;

      if (total <= pageSize) {
        return false;
      }

      return showQuickJumper;
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyDown", function (e) {
      if (e.keyCode === KEYCODE.ARROW_UP || e.keyCode === KEYCODE.ARROW_DOWN) {
        e.preventDefault();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyUp", function (e) {
      var value = _this.getValidValue(e);

      var currentInputValue = _this.state.currentInputValue;

      if (value !== currentInputValue) {
        _this.setState({
          currentInputValue: value
        });
      }

      if (e.keyCode === KEYCODE.ENTER) {
        _this.handleChange(value);
      } else if (e.keyCode === KEYCODE.ARROW_UP) {
        _this.handleChange(value - 1);
      } else if (e.keyCode === KEYCODE.ARROW_DOWN) {
        _this.handleChange(value + 1);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleBlur", function (e) {
      var value = _this.getValidValue(e);

      _this.handleChange(value);
    });

    _defineProperty(_assertThisInitialized(_this), "changePageSize", function (size) {
      var _this$props$onShowSiz, _this$props2;

      var current = _this.state.current;
      var newCurrent = calculatePage(size, _this.state, _this.props);
      current = current > newCurrent ? newCurrent : current;

      if (newCurrent === 0) {
        current = _this.state.current;
      }

      if (typeof size === 'number') {
        if (!('pageSize' in _this.props)) {
          _this.setState({
            pageSize: size
          });
        }

        if (!('current' in _this.props)) {
          _this.setState({
            current: current,
            currentInputValue: current
          });
        }
      }

      (_this$props$onShowSiz = (_this$props2 = _this.props).onShowSizeChange) === null || _this$props$onShowSiz === void 0 ? void 0 : _this$props$onShowSiz.call(_this$props2, current, size);

      if ('onChange' in _this.props && _this.props.onChange) {
        _this.props.onChange(current, size);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (page) {
      var _this$props3 = _this.props,
          disabled = _this$props3.disabled,
          onChange = _this$props3.onChange;
      var _this$state = _this.state,
          pageSize = _this$state.pageSize,
          current = _this$state.current,
          currentInputValue = _this$state.currentInputValue;

      if (_this.isValid(page) && !disabled) {
        var currentPage = calculatePage(undefined, _this.state, _this.props);
        var newPage = page;

        if (page > currentPage) {
          newPage = currentPage;
        } else if (page < 1) {
          newPage = 1;
        }

        if (!('current' in _this.props)) {
          _this.setState({
            current: newPage
          });
        }

        if (newPage !== currentInputValue) {
          _this.setState({
            currentInputValue: newPage
          });
        }

        onChange === null || onChange === void 0 ? void 0 : onChange(newPage, pageSize);
        return newPage;
      }

      return current;
    });

    _defineProperty(_assertThisInitialized(_this), "prev", function () {
      if (_this.hasPrev()) {
        _this.handleChange(_this.state.current - 1);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "next", function () {
      if (_this.hasNext()) {
        _this.handleChange(_this.state.current + 1);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "jumpPrev", function () {
      _this.handleChange(_this.getJumpPrevPage());
    });

    _defineProperty(_assertThisInitialized(_this), "jumpNext", function () {
      _this.handleChange(_this.getJumpNextPage());
    });

    _defineProperty(_assertThisInitialized(_this), "hasPrev", function () {
      return _this.state.current > 1;
    });

    _defineProperty(_assertThisInitialized(_this), "hasNext", function () {
      return _this.state.current < calculatePage(undefined, _this.state, _this.props);
    });

    _defineProperty(_assertThisInitialized(_this), "runIfEnter", function (event, callback) {
      if (event.key === 'Enter' || event.charCode === 13) {
        for (var _len = arguments.length, restParams = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          restParams[_key - 2] = arguments[_key];
        }

        callback.apply(void 0, restParams);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "runIfEnterPrev", function (e) {
      _this.runIfEnter(e, _this.prev);
    });

    _defineProperty(_assertThisInitialized(_this), "runIfEnterNext", function (e) {
      _this.runIfEnter(e, _this.next);
    });

    _defineProperty(_assertThisInitialized(_this), "runIfEnterJumpPrev", function (e) {
      _this.runIfEnter(e, _this.jumpPrev);
    });

    _defineProperty(_assertThisInitialized(_this), "runIfEnterJumpNext", function (e) {
      _this.runIfEnter(e, _this.jumpNext);
    });

    _defineProperty(_assertThisInitialized(_this), "handleGoTO", function (e) {
      if (e.keyCode === KEYCODE.ENTER || e.type === 'click') {
        _this.handleChange(_this.state.currentInputValue);
      }
    });

    var _current = props.defaultCurrent;

    if ('current' in props) {
      _current = props.current;
    }

    var _pageSize = props.defaultPageSize;

    if ('pageSize' in props) {
      _pageSize = props.pageSize;
    }

    _current = Math.min(_current, calculatePage(_pageSize, undefined, props));
    _this.state = {
      current: _current,
      currentInputValue: _current,
      pageSize: _pageSize
    };
    return _this;
  }

  _createClass(Pagination, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var prefixCls = this.props.prefixCls;

      if (prevState.current !== this.state.current && this.paginationNode) {
        var lastCurrentNode = this.paginationNode.querySelector(".".concat(prefixCls, "-item-").concat(prevState.current));

        if (lastCurrentNode && document.activeElement === lastCurrentNode) {
          lastCurrentNode.blur();
        }
      }
    }
  }, {
    key: "getValidValue",
    value: function getValidValue(e) {
      var inputValue = e.target.value;
      var allPages = calculatePage(undefined, this.state, this.props);
      var currentInputValue = this.state.currentInputValue;
      var value;

      if (inputValue === '') {
        value = inputValue; // eslint-disable-next-line no-restricted-globals
      } else if (isNaN(Number(inputValue))) {
        value = currentInputValue;
      } else if (inputValue >= allPages) {
        value = allPages;
      } else {
        value = Number(inputValue);
      }

      return value;
    }
  }, {
    key: "getShowSizeChanger",
    value: function getShowSizeChanger() {
      var _this$props4 = this.props,
          showSizeChanger = _this$props4.showSizeChanger,
          total = _this$props4.total,
          totalBoundaryShowSizeChanger = _this$props4.totalBoundaryShowSizeChanger;

      if (typeof showSizeChanger !== 'undefined') {
        return showSizeChanger;
      }

      return total > totalBoundaryShowSizeChanger;
    }
  }, {
    key: "renderPrev",
    value: function renderPrev(prevPage) {
      var _this$props5 = this.props,
          prevIcon = _this$props5.prevIcon,
          itemRender = _this$props5.itemRender;
      var prevButton = itemRender === null || itemRender === void 0 ? void 0 : itemRender(prevPage, 'prev', this.getItemIcon(prevIcon, 'prev page'));
      var disabled = !this.hasPrev();
      return /*#__PURE__*/isValidElement(prevButton) ? /*#__PURE__*/cloneElement(prevButton, {
        disabled: disabled
      }) : prevButton;
    }
  }, {
    key: "renderNext",
    value: function renderNext(nextPage) {
      var _this$props6 = this.props,
          nextIcon = _this$props6.nextIcon,
          itemRender = _this$props6.itemRender;
      var nextButton = itemRender === null || itemRender === void 0 ? void 0 : itemRender(nextPage, 'next', this.getItemIcon(nextIcon, 'next page'));
      var disabled = !this.hasNext();
      return /*#__PURE__*/isValidElement(nextButton) ? /*#__PURE__*/cloneElement(nextButton, {
        disabled: disabled
      }) : nextButton;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props7 = this.props,
          prefixCls = _this$props7.prefixCls,
          className = _this$props7.className,
          style = _this$props7.style,
          disabled = _this$props7.disabled,
          hideOnSinglePage = _this$props7.hideOnSinglePage,
          total = _this$props7.total,
          locale = _this$props7.locale,
          showQuickJumper = _this$props7.showQuickJumper,
          showLessItems = _this$props7.showLessItems,
          showTitle = _this$props7.showTitle,
          showTotal = _this$props7.showTotal,
          simple = _this$props7.simple,
          itemRender = _this$props7.itemRender,
          showPrevNextJumpers = _this$props7.showPrevNextJumpers,
          jumpPrevIcon = _this$props7.jumpPrevIcon,
          jumpNextIcon = _this$props7.jumpNextIcon,
          selectComponentClass = _this$props7.selectComponentClass,
          selectPrefixCls = _this$props7.selectPrefixCls,
          pageSizeOptions = _this$props7.pageSizeOptions;
      var _this$state2 = this.state,
          current = _this$state2.current,
          pageSize = _this$state2.pageSize,
          currentInputValue = _this$state2.currentInputValue; // When hideOnSinglePage is true and there is only 1 page, hide the pager

      if (hideOnSinglePage === true && total <= pageSize) {
        return null;
      }

      var allPages = calculatePage(undefined, this.state, this.props);
      var pagerList = [];
      var jumpPrev = null;
      var jumpNext = null;
      var firstPager = null;
      var lastPager = null;
      var gotoButton = null;
      var goButton = showQuickJumper && showQuickJumper.goButton;
      var pageBufferSize = showLessItems ? 1 : 2;
      var prevPage = current - 1 > 0 ? current - 1 : 0;
      var nextPage = current + 1 < allPages ? current + 1 : allPages;
      var dataOrAriaAttributeProps = Object.keys(this.props).reduce(function (prev, key) {
        if (key.substr(0, 5) === 'data-' || key.substr(0, 5) === 'aria-' || key === 'role') {
          // eslint-disable-next-line no-param-reassign
          prev[key] = _this2.props[key];
        }

        return prev;
      }, {});

      if (simple) {
        if (goButton) {
          if (typeof goButton === 'boolean') {
            gotoButton = /*#__PURE__*/_jsx("button", {
              type: "button",
              onClick: this.handleGoTO,
              onKeyUp: this.handleGoTO,
              children: locale === null || locale === void 0 ? void 0 : locale.jump_to_confirm
            });
          } else {
            gotoButton = /*#__PURE__*/_jsx("span", {
              onClick: this.handleGoTO,
              onKeyUp: this.handleGoTO,
              children: goButton
            });
          }

          gotoButton = /*#__PURE__*/_jsx("li", {
            title: showTitle ? "".concat(locale === null || locale === void 0 ? void 0 : locale.jump_to).concat(current, "/").concat(allPages) : null,
            className: "".concat(prefixCls, "-simple-pager"),
            children: gotoButton
          });
        }

        return /*#__PURE__*/_jsxs("ul", _objectSpread(_objectSpread({
          className: classNames(prefixCls, "".concat(prefixCls, "-simple"), _defineProperty({}, "".concat(prefixCls, "-disabled"), disabled), className),
          style: style,
          ref: this.savePaginationNode
        }, dataOrAriaAttributeProps), {}, {
          children: [/*#__PURE__*/_jsx("li", {
            title: showTitle ? locale === null || locale === void 0 ? void 0 : locale.prev_page : null,
            onClick: this.prev,
            tabIndex: this.hasPrev() ? 0 : null,
            onKeyPress: this.runIfEnterPrev,
            className: classNames("".concat(prefixCls, "-prev"), _defineProperty({}, "".concat(prefixCls, "-disabled"), !this.hasPrev())),
            "aria-disabled": !this.hasPrev(),
            children: this.renderPrev(prevPage)
          }), /*#__PURE__*/_jsxs("li", {
            title: showTitle ? "".concat(current, "/").concat(allPages) : null,
            className: "".concat(prefixCls, "-simple-pager"),
            children: [/*#__PURE__*/_jsx("input", {
              type: "text",
              value: currentInputValue,
              disabled: disabled,
              onKeyDown: this.handleKeyDown,
              onKeyUp: this.handleKeyUp,
              onChange: this.handleKeyUp,
              onBlur: this.handleBlur,
              size: "3"
            }), /*#__PURE__*/_jsx("span", {
              className: "".concat(prefixCls, "-slash"),
              children: "/"
            }), allPages]
          }), /*#__PURE__*/_jsx("li", {
            title: showTitle ? locale === null || locale === void 0 ? void 0 : locale.next_page : null,
            onClick: this.next,
            tabIndex: this.hasPrev() ? 0 : null,
            onKeyPress: this.runIfEnterNext,
            className: classNames("".concat(prefixCls, "-next"), _defineProperty({}, "".concat(prefixCls, "-disabled"), !this.hasNext())),
            "aria-disabled": !this.hasNext(),
            children: this.renderNext(nextPage)
          }), gotoButton]
        }));
      }

      if (allPages <= 3 + pageBufferSize * 2) {
        var pagerProps = {
          locale: locale,
          rootPrefixCls: prefixCls,
          onClick: this.handleChange,
          onKeyPress: this.runIfEnter,
          showTitle: showTitle,
          itemRender: itemRender
        };

        if (!allPages) {
          pagerList.push( /*#__PURE__*/_createElement(Pager, _objectSpread(_objectSpread({}, pagerProps), {}, {
            key: "noPager",
            page: 1,
            className: "".concat(prefixCls, "-item-disabled")
          })));
        }

        for (var i = 1; i <= allPages; i += 1) {
          var active = current === i;
          pagerList.push( /*#__PURE__*/_createElement(Pager, _objectSpread(_objectSpread({}, pagerProps), {}, {
            key: i,
            page: i,
            active: active
          })));
        }
      } else {
        var prevItemTitle = showLessItems ? locale === null || locale === void 0 ? void 0 : locale.prev_3 : locale === null || locale === void 0 ? void 0 : locale.prev_5;
        var nextItemTitle = showLessItems ? locale === null || locale === void 0 ? void 0 : locale.next_3 : locale === null || locale === void 0 ? void 0 : locale.next_5;

        if (showPrevNextJumpers) {
          jumpPrev = /*#__PURE__*/_jsx("li", {
            title: showTitle ? prevItemTitle : null,
            onClick: this.jumpPrev,
            tabIndex: "0",
            onKeyPress: this.runIfEnterJumpPrev,
            className: classNames("".concat(prefixCls, "-jump-prev"), _defineProperty({}, "".concat(prefixCls, "-jump-prev-custom-icon"), !!jumpPrevIcon)),
            children: itemRender === null || itemRender === void 0 ? void 0 : itemRender(this.getJumpPrevPage(), 'jump-prev', this.getItemIcon(jumpPrevIcon, 'prev page'))
          }, 'prev');
          jumpNext = /*#__PURE__*/_jsx("li", {
            title: showTitle ? nextItemTitle : null,
            tabIndex: "0",
            onClick: this.jumpNext,
            onKeyPress: this.runIfEnterJumpNext,
            className: classNames("".concat(prefixCls, "-jump-next"), _defineProperty({}, "".concat(prefixCls, "-jump-next-custom-icon"), !!jumpNextIcon)),
            children: itemRender === null || itemRender === void 0 ? void 0 : itemRender(this.getJumpNextPage(), 'jump-next', this.getItemIcon(jumpNextIcon, 'next page'))
          }, 'next');
        }

        lastPager = /*#__PURE__*/_jsx(Pager, {
          locale: locale,
          last: true,
          rootPrefixCls: prefixCls,
          onClick: this.handleChange,
          onKeyPress: this.runIfEnter,
          page: allPages,
          active: false,
          showTitle: showTitle,
          itemRender: itemRender
        }, allPages);
        firstPager = /*#__PURE__*/_jsx(Pager, {
          locale: locale,
          rootPrefixCls: prefixCls,
          onClick: this.handleChange,
          onKeyPress: this.runIfEnter,
          page: 1,
          active: false,
          showTitle: showTitle,
          itemRender: itemRender
        }, 1);
        var left = Math.max(1, current - pageBufferSize);
        var right = Math.min(current + pageBufferSize, allPages);

        if (current - 1 <= pageBufferSize) {
          right = 1 + pageBufferSize * 2;
        }

        if (allPages - current <= pageBufferSize) {
          left = allPages - pageBufferSize * 2;
        }

        for (var _i = left; _i <= right; _i += 1) {
          var _active = current === _i;

          pagerList.push( /*#__PURE__*/_jsx(Pager, {
            locale: locale,
            rootPrefixCls: prefixCls,
            onClick: this.handleChange,
            onKeyPress: this.runIfEnter,
            page: _i,
            active: _active,
            showTitle: showTitle,
            itemRender: itemRender
          }, _i));
        }

        if (current - 1 >= pageBufferSize * 2 && current !== 1 + 2) {
          pagerList[0] = /*#__PURE__*/cloneElement(pagerList[0], {
            className: "".concat(prefixCls, "-item-after-jump-prev")
          });
          pagerList.unshift(jumpPrev);
        }

        if (allPages - current >= pageBufferSize * 2 && current !== allPages - 2) {
          pagerList[pagerList.length - 1] = /*#__PURE__*/cloneElement(pagerList[pagerList.length - 1], {
            className: "".concat(prefixCls, "-item-before-jump-next")
          });
          pagerList.push(jumpNext);
        }

        if (left !== 1) {
          pagerList.unshift(firstPager);
        }

        if (right !== allPages) {
          pagerList.push(lastPager);
        }
      }

      var totalText = null;

      if (showTotal) {
        totalText = /*#__PURE__*/_jsx("li", {
          className: "".concat(prefixCls, "-total-text"),
          children: showTotal === null || showTotal === void 0 ? void 0 : showTotal(total, [total === 0 ? 0 : (current - 1) * pageSize + 1, current * pageSize > total ? total : current * pageSize])
        });
      }

      var prevDisabled = !this.hasPrev() || !allPages;
      var nextDisabled = !this.hasNext() || !allPages;
      return /*#__PURE__*/_jsxs("ul", _objectSpread(_objectSpread({
        className: classNames(prefixCls, className, _defineProperty({}, "".concat(prefixCls, "-disabled"), disabled)),
        style: style,
        unselectable: "unselectable",
        ref: this.savePaginationNode
      }, dataOrAriaAttributeProps), {}, {
        children: [totalText, /*#__PURE__*/_jsx("li", {
          title: showTitle ? locale === null || locale === void 0 ? void 0 : locale.prev_page : null,
          onClick: this.prev,
          tabIndex: prevDisabled ? null : 0,
          onKeyPress: this.runIfEnterPrev,
          className: classNames("".concat(prefixCls, "-prev"), _defineProperty({}, "".concat(prefixCls, "-disabled"), prevDisabled)),
          "aria-disabled": prevDisabled,
          children: this.renderPrev(prevPage)
        }), pagerList, /*#__PURE__*/_jsx("li", {
          title: showTitle ? locale === null || locale === void 0 ? void 0 : locale.next_page : null,
          onClick: this.next,
          tabIndex: nextDisabled ? null : 0,
          onKeyPress: this.runIfEnterNext,
          className: classNames("".concat(prefixCls, "-next"), _defineProperty({}, "".concat(prefixCls, "-disabled"), nextDisabled)),
          "aria-disabled": nextDisabled,
          children: this.renderNext(nextPage)
        }), /*#__PURE__*/_jsx(Options, {
          disabled: disabled,
          locale: locale,
          rootPrefixCls: prefixCls,
          selectComponentClass: selectComponentClass,
          selectPrefixCls: selectPrefixCls,
          changeSize: this.getShowSizeChanger() ? this.changePageSize : null,
          current: current,
          pageSize: pageSize,
          pageSizeOptions: pageSizeOptions,
          quickGo: this.shouldDisplayQuickJumper() ? this.handleChange : null,
          goButton: goButton
        })]
      }));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, prevState) {
      var newState = {};

      if ('current' in props) {
        newState.current = props.current;

        if (props.current !== prevState.current) {
          newState.currentInputValue = newState.current;
        }
      }

      if ('pageSize' in props && props.pageSize !== prevState.pageSize) {
        var current = prevState.current;
        var newCurrent = calculatePage(props.pageSize, prevState, props);
        current = current > newCurrent ? newCurrent : current;

        if (!('current' in props)) {
          newState.current = current;
          newState.currentInputValue = current;
        }

        newState.pageSize = props.pageSize;
      }

      return newState;
    }
  }]);

  return Pagination;
}(Component);

_defineProperty(Pagination, "defaultProps", {
  defaultCurrent: 1,
  total: 0,
  defaultPageSize: 10,
  onChange: noop,
  className: '',
  selectPrefixCls: 'basic-select',
  prefixCls: 'basic-pagination',
  selectComponentClass: null,
  hideOnSinglePage: false,
  showPrevNextJumpers: true,
  showQuickJumper: false,
  showLessItems: false,
  showTitle: true,
  onShowSizeChange: noop,
  locale: LOCALE,
  style: {},
  itemRender: defaultItemRender,
  totalBoundaryShowSizeChanger: 50
});

export default Pagination;