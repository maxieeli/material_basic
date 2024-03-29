export var VALUE_SPLIT = '__BASIC_CASCADER_SPLIT__';
export var SHOW_PARENT = 'SHOW_PARENT';
export var SHOW_CHILD = 'SHOW_CHILD';
export function toPathKey(value) {
  return value.join(VALUE_SPLIT);
}
export function toPathKeys(value) {
  return value.map(toPathKey);
}
export function toPathValueStr(pathKey) {
  return pathKey.split(VALUE_SPLIT);
}
export function fillFieldNames(fieldNames) {
  var _ref = fieldNames || {},
      label = _ref.label,
      value = _ref.value,
      children = _ref.children;

  var val = value || 'value';
  return {
    label: label || 'label',
    value: val,
    key: val,
    children: children || 'children'
  };
}
export function isLeaf(option, fieldNames) {
  var _option$isLeaf, _option$fieldNames$ch;

  return (_option$isLeaf = option.isLeaf) !== null && _option$isLeaf !== void 0 ? _option$isLeaf : !((_option$fieldNames$ch = option[fieldNames.children]) !== null && _option$fieldNames$ch !== void 0 && _option$fieldNames$ch.length);
}
export function scrollIntoParentView(element) {
  var parent = element.parentElement;

  if (!parent) {
    return;
  }

  var elementToParent = element.offsetTop - parent.offsetTop; // offsetParent may not be parent.

  if (elementToParent - parent.scrollTop < 0) {
    parent.scrollTo({
      top: elementToParent
    });
  } else if (elementToParent + element.offsetHeight - parent.scrollTop > parent.offsetHeight) {
    parent.scrollTo({
      top: elementToParent + element.offsetHeight - parent.offsetHeight
    });
  }
}