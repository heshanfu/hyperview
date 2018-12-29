Object.defineProperty(exports, '__esModule', { value: true });
var _jsxFileName = 'src/VisibilityDetectingView.js';
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
var _reactNative = require('react-native');
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
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
var TICK_INTERVAL = 100;
var VisibilityDetectingView = (function(_PureComponent) {
  _inherits(VisibilityDetectingView, _PureComponent);
  function VisibilityDetectingView() {
    var _ref;
    var _temp, _this, _ret;
    _classCallCheck(this, VisibilityDetectingView);
    for (
      var _len = arguments.length, args = Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key];
    }
    return (
      (_ret = ((_temp = ((_this = _possibleConstructorReturn(
        this,
        (_ref =
          VisibilityDetectingView.__proto__ ||
          Object.getPrototypeOf(VisibilityDetectingView)).call.apply(
          _ref,
          [this].concat(args),
        ),
      )),
      _this)),
      (_this.previouslyVisible = false),
      (_this.unmounted = false),
      (_this.onRef = function(view) {
        _this.view = view;
      }),
      (_this.onTick = function() {
        if (_this.unmounted) {
          return;
        }
        if (_this.view && _reactNative.UIManager.measure) {
          _this.view.measure(_this.onMeasure);
        }
      }),
      (_this.onMeasure = function(x, y, width, height, pageX, pageY) {
        var windowDimensions = _reactNative.Dimensions.get('window');
        var bottom = pageY + height;
        var left = pageX;
        var right = pageX + width;
        var top = pageY;
        var windowHeight = windowDimensions.height;
        var windowWidth = windowDimensions.width;
        var visible =
          right > 0 && left < windowWidth && top < windowHeight && bottom > 0;
        if (!_this.previouslyVisible && visible) {
          if (_this.props.onVisible) {
            _this.props.onVisible();
          }
        } else if (_this.previouslyVisible && !visible) {
          if (_this.props.onInvisible) {
            _this.props.onInvisible();
          }
        }
        _this.previouslyVisible = visible;
      }),
      _temp)),
      _possibleConstructorReturn(_this, _ret)
    );
  }
  _createClass(VisibilityDetectingView, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.tickInterval = setInterval(this.onTick, TICK_INTERVAL);
      },
    },
    {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (this.tickInterval) {
          clearInterval(this.tickInterval);
        }
        this.unmounted = true;
      },
    },
    {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          _reactNative.View,
          {
            collapsable: false,
            ref: this.onRef,
            style: this.props.style,
            __source: { fileName: _jsxFileName, lineNumber: 74 },
          },
          this.props.children,
        );
      },
    },
  ]);
  return VisibilityDetectingView;
})(_react.PureComponent);
exports.default = VisibilityDetectingView;