Object.defineProperty(exports, '__esModule', { value: true });
exports.renderChildren = exports.renderElement = undefined;
var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
var _jsxFileName = 'src/services/render/index.js';
var _namespaces = require('../namespaces');
var Namespaces = _interopRequireWildcard(_namespaces);
var _types = require('../../types');
var _ = require('../..');
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key))
          newObj[key] = obj[key];
      }
    }
    newObj.default = obj;
    return newObj;
  }
}
var renderElement = (exports.renderElement = function renderElement(
  element,
  stylesheets,
  animations,
  onUpdate,
  options,
) {
  if (element.nodeType === _types.NODE_TYPE.ELEMENT_NODE) {
    if (element.getAttribute('hide') === 'true') {
      return null;
    }
  }
  if (element.namespaceURI === Namespaces.HYPERVIEW) {
    switch (element.localName) {
      case _types.LOCAL_NAME.BODY:
      case _types.LOCAL_NAME.VIEW:
      case _types.LOCAL_NAME.FORM:
      case _types.LOCAL_NAME.HEADER:
      case _types.LOCAL_NAME.ITEM:
      case _types.LOCAL_NAME.SECTION_TITLE:
        return (0, _.view)(element, stylesheets, animations, onUpdate, options);
      case _types.LOCAL_NAME.IMAGE:
        return (0, _.image)(
          element,
          stylesheets,
          animations,
          onUpdate,
          options,
        );
      case _types.LOCAL_NAME.TEXT:
        return (0, _.text)(element, stylesheets, animations, onUpdate, options);
      default:
        break;
    }
  }
  if (
    element.namespaceURI &&
    element.localName &&
    options.componentRegistry &&
    options.componentRegistry[element.namespaceURI] &&
    options.componentRegistry[element.namespaceURI][element.localName]
  ) {
    var Component =
      options.componentRegistry[element.namespaceURI][element.localName];
    return _react2.default.createElement(Component, {
      element: element,
      stylesheets: stylesheets,
      animations: animations,
      onUpdate: onUpdate,
      options: options,
      __source: { fileName: _jsxFileName, lineNumber: 66 },
    });
  }
  if (element.nodeValue && element.nodeValue.trim().length > 0) {
    return element.nodeValue.trim();
  }
  return null;
});
var renderChildren = (exports.renderChildren = function renderChildren(
  element,
  stylesheets,
  animations,
  onUpdate,
  options,
) {
  var children = [];
  if (element.childNodes !== null) {
    for (var i = 0; i < element.childNodes.length; i += 1) {
      var e = renderElement(
        element.childNodes.item(i),
        stylesheets,
        animations,
        onUpdate,
        _extends({}, options, { skipHref: false }),
      );
      if (e) {
        children.push(e);
      }
    }
  }
  return children;
});