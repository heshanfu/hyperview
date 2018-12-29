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
var _xmldom = require('xmldom');
var _types = require('../../types');
var _reactNative = require('react-native');
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
var HvSectionList = (function(_PureComponent) {
  _inherits(HvSectionList, _PureComponent);
  function HvSectionList() {
    var _ref;
    var _temp, _this, _ret;
    _classCallCheck(this, HvSectionList);
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
          HvSectionList.__proto__ ||
          Object.getPrototypeOf(HvSectionList)).call.apply(
          _ref,
          [this].concat(args),
        ),
      )),
      _this)),
      (_this.parser = new _xmldom.DOMParser()),
      (_this.state = { refreshing: false }),
      (_this.refresh = function() {
        var _this$props = _this.props,
          element = _this$props.element,
          onUpdate = _this$props.onUpdate;
        _this.setState({ refreshing: true });
        var path = element.getAttribute('href');
        var action = element.getAttribute('action') || 'append';
        var targetId = element.getAttribute('target') || null;
        var showIndicatorIds = element.getAttribute('show-during-load') || null;
        var hideIndicatorIds = element.getAttribute('hide-during-load') || null;
        var delay = element.getAttribute('delay');
        var once = element.getAttribute('once') || null;
        onUpdate(path, action, element, {
          targetId: targetId,
          showIndicatorIds: showIndicatorIds,
          hideIndicatorIds: hideIndicatorIds,
          delay: delay,
          once: once,
          onEnd: function onEnd() {
            _this.setState({ refreshing: false });
          },
        });
      }),
      _temp)),
      _possibleConstructorReturn(_this, _ret)
    );
  }
  _createClass(HvSectionList, [
    {
      key: 'render',
      value: function render() {
        var _this2 = this;
        var refreshing = this.state.refreshing;
        var _props = this.props,
          element = _props.element,
          stylesheets = _props.stylesheets,
          animations = _props.animations,
          onUpdate = _props.onUpdate,
          options = _props.options;
        var styleAttr = element.getAttribute('style');
        var style = styleAttr
          ? styleAttr.split(' ').map(function(s) {
              return stylesheets.regular[s];
            })
          : null;
        var sectionElements = element.getElementsByTagNameNS(
          Namespaces.HYPERVIEW,
          'section',
        );
        var sections = [];
        for (var i = 0; i < sectionElements.length; i += 1) {
          var sectionElement = sectionElements.item(i);
          if (sectionElement) {
            var itemElements = sectionElement.getElementsByTagNameNS(
              Namespaces.HYPERVIEW,
              'item',
            );
            var items = [];
            for (var j = 0; j < itemElements.length; j += 1) {
              var itemElement = itemElements.item(j);
              items.push(itemElement);
            }
            var titleElement = sectionElement
              .getElementsByTagNameNS(Namespaces.HYPERVIEW, 'section-title')
              .item(0);
            sections.push({ title: titleElement, data: items });
          }
        }
        var listProps = {
          style: style,
          sections: sections,
          keyExtractor: function keyExtractor(item) {
            return item.getAttribute('key');
          },
          renderItem: function renderItem(_ref2) {
            var item = _ref2.item;
            return Render.renderElement(
              item,
              stylesheets,
              animations,
              onUpdate,
              options,
            );
          },
          renderSectionHeader: function renderSectionHeader(_ref3) {
            var title = _ref3.section.title;
            return Render.renderElement(
              title,
              stylesheets,
              animations,
              onUpdate,
              options,
            );
          },
        };
        var refreshProps = {};
        if (element.getAttribute('trigger') === 'refresh') {
          refreshProps = {
            onRefresh: function onRefresh() {
              return _this2.refresh();
            },
            refreshing: refreshing,
          };
        }
        return _react2.default.createElement(
          _reactNative.SectionList,
          _extends({}, listProps, refreshProps),
        );
      },
    },
  ]);
  return HvSectionList;
})(_react.PureComponent);
HvSectionList.namespaceURI = Namespaces.HYPERVIEW;
HvSectionList.localName = _types.LOCAL_NAME.SECTION_LIST;
exports.default = HvSectionList;