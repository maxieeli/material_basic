import classNames from 'classnames';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function Popup(props) {
  var showArrow = props.showArrow,
      arrowContent = props.arrowContent,
      children = props.children,
      prefixCls = props.prefixCls,
      id = props.id,
      overlayInnerStyle = props.overlayInnerStyle,
      className = props.className,
      style = props.style;
  return /*#__PURE__*/_jsxs("div", {
    className: classNames("".concat(prefixCls, "-content"), className),
    style: style,
    children: [showArrow !== false && /*#__PURE__*/_jsx("div", {
      className: "".concat(prefixCls, "-arrow"),
      children: arrowContent
    }, 'arrow'), /*#__PURE__*/_jsx("div", {
      className: "".concat(prefixCls, "-inner"),
      id: id,
      role: "tooltip",
      style: overlayInnerStyle,
      children: typeof children === 'function' ? children() : children
    })]
  });
}