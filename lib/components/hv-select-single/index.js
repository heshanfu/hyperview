Object.defineProperty(exports, '__esModule', { value: true });
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
var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();
var _namespaces = require('../../services/namespaces');
var Namespaces = _interopRequireWildcard(_namespaces);
var _render = require('../../services/render');
var Render = _interopRequireWildcard(_render);
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _types = require('../../types');
var _reactNative = require('react-native');
var _services = require('../../services');
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
function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  } else {
    return Array.from(arr);
  }
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}
function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    );
  }
  return call && (typeof call === 'object' || typeof call === 'function')
    ? call
    : self;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError(
      'Super expression must either be null or a function, not ' +
        typeof superClass,
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}
var HvSelectSingle = (function(_PureComponent) {
  _inherits(HvSelectSingle, _PureComponent);
  function HvSelectSingle(props) {
    _classCallCheck(this, HvSelectSingle);
    var _this = _possibleConstructorReturn(
      this,
      (HvSelectSingle.__proto__ || Object.getPrototypeOf(HvSelectSingle)).call(
        this,
        props,
      ),
    );
    _this.onSelect = function(selectedValue) {
      var _this$props = _this.props,
        element = _this$props.element,
        onUpdate = _this$props.onUpdate;
      var newElement = element.cloneNode(true);
      var options = newElement.getElementsByTagNameNS(
        Namespaces.HYPERVIEW,
        'option',
      );
      for (var i = 0; i < options.length; i += 1) {
        var opt = options.item(i);
        if (opt) {
          var value = opt.getAttribute('value');
          opt.setAttribute(
            'selected',
            value === selectedValue ? 'true' : 'false',
          );
        }
      }
      onUpdate('#', 'swap', element, { newElement: newElement });
    };
    _this.onSelect = _this.onSelect.bind(_this);
    return _this;
  }
  _createClass(HvSelectSingle, [
    {
      key: 'render',
      value: function render() {
        var _props = this.props,
          element = _props.element,
          stylesheets = _props.stylesheets,
          animations = _props.animations,
          onUpdate = _props.onUpdate,
          options = _props.options;
        if (element.getAttribute('hide') === 'true') {
          return null;
        }
        var props = (0, _services.createProps)(
          element,
          stylesheets,
          animations,
          _extends({}, options),
        );
        return _react2.default.createElement.apply(
          _react2.default,
          [_reactNative.View, props].concat(
            _toConsumableArray(
              Render.renderChildren(
                element,
                stylesheets,
                animations,
                onUpdate,
                _extends({}, options, { onSelect: this.onSelect }),
              ),
            ),
          ),
        );
      },
    },
  ]);
  return HvSelectSingle;
})(_react.PureComponent);
HvSelectSingle.namespaceURI = Namespaces.HYPERVIEW;
HvSelectSingle.localName = _types.LOCAL_NAME.SELECT_SINGLE;
exports.default = HvSelectSingle;