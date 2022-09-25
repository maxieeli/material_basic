import classNames from 'classnames';
import { jsx as _jsx } from "react/jsx-runtime";

var TransBtn = function TransBtn(_ref) {
  var className = _ref.className,
      customizeIcon = _ref.customizeIcon,
      customizeIconProps = _ref.customizeIconProps,
      _onMouseDown = _ref.onMouseDown,
      onClick = _ref.onClick,
      children = _ref.children;
  var icon;

  if (typeof customizeIcon === 'function') {
    icon = customizeIcon(customizeIconProps);
  } else {
    icon = customizeIcon;
  }

  return /*#__PURE__*/_jsx("span", {
    className: className,
    onMouseDown: function onMouseDown(event) {
      event.preventDefault();

      if (_onMouseDown) {
        _onMouseDown(event);
      }
    },
    style: {
      userSelect: 'none',
      WebkitUserSelect: 'none'
    },
    unselectable: "on",
    onClick: onClick,
    "aria-hidden": true,
    children: icon !== undefined ? icon : /*#__PURE__*/_jsx("span", {
      className: classNames(className.split(/\s+/).map(function (cls) {
        return "".concat(cls, "-icon");
      })),
      children: children
    })
  });
};

export default TransBtn;