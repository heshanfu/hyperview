Object.defineProperty(exports, '__esModule', { value: true });
var _jsxFileName = 'src/index.js';
var _slicedToArray = (function() {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {
      for (
        var _i = arr[
            typeof Symbol === 'function' ? Symbol.iterator : '@@iterator'
          ](),
          _s;
        !(_n = (_s = _i.next()).done);
        _n = true
      ) {
        _arr.push(_s.value);
        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i['return']) _i['return']();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
  return function(arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (
      (typeof Symbol === 'function' ? Symbol.iterator : '@@iterator') in
      Object(arr)
    ) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError(
        'Invalid attempt to destructure non-iterable instance',
      );
    }
  };
})();
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
exports.image = image;
exports.view = view;
exports.text = text;
var _types = require('./types');
Object.keys(_types).forEach(function(key) {
  if (key === 'default' || key === '__esModule') return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _types[key];
    },
  });
});
var _components = require('./services/components');
var Components = _interopRequireWildcard(_components);
var _namespaces = require('./services/namespaces');
var Namespaces = _interopRequireWildcard(_namespaces);
var _render = require('./services/render');
var Render = _interopRequireWildcard(_render);
var _stylesheets = require('./services/stylesheets');
var Stylesheets = _interopRequireWildcard(_stylesheets);
var _reactNative = require('react-native');
var _xmldom = require('xmldom');
var _reactNativeKeyboardAwareScrollview = require('react-native-keyboard-aware-scrollview');
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _VisibilityDetectingView = require('./VisibilityDetectingView.js');
var _VisibilityDetectingView2 = _interopRequireDefault(
  _VisibilityDetectingView,
);
var _services = require('./services');
var _package = require('../package.json');
var _urlParse = require('url-parse');
var _urlParse2 = _interopRequireDefault(_urlParse);
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
var HYPERVIEW_NS = Namespaces.HYPERVIEW;
var AMPLITUDE_NS = Namespaces.AMPLITUDE;
var PHONE_NS = Namespaces.PHONE;
var INTERCOM_NS = Namespaces.INTERCOM;
var REDUX_NS = Namespaces.REDUX;
var SHARE_NS = Namespaces.SHARE;
var ROUTE_KEYS = {};
var PRELOAD_SCREEN = {};
var HYPERVIEW_VERSION = _package.version;
function uid() {
  return Date.now();
}
function later(delay) {
  return new Promise(function(resolve) {
    return setTimeout(resolve, delay);
  });
}
function getHyperviewHeaders() {
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  return {
    'X-Hyperview-Version': HYPERVIEW_VERSION,
    'X-Hyperview-Dimensions': width + 'w ' + height + 'h',
  };
}
var HyperRef = (function(_React$Component) {
  _inherits(HyperRef, _React$Component);
  function HyperRef(props) {
    _classCallCheck(this, HyperRef);
    var _this = _possibleConstructorReturn(
      this,
      (HyperRef.__proto__ || Object.getPrototypeOf(HyperRef)).call(this, props),
    );
    _this.createActionHandler = function(element, behaviorElement, onUpdate) {
      var action = behaviorElement.getAttribute('action') || 'push';
      if (_this.navActions.indexOf(action) >= 0) {
        return function() {
          var href = behaviorElement.getAttribute('href');
          var showIndicatorId = behaviorElement.getAttribute(
            'show-during-load',
          );
          var delay = behaviorElement.getAttribute('delay');
          onUpdate(href, action, element, {
            showIndicatorId: showIndicatorId,
            delay: delay,
          });
        };
      } else if (_this.updateActions.indexOf(action) >= 0) {
        return function() {
          var href = behaviorElement.getAttribute('href');
          var verb = behaviorElement.getAttribute('verb');
          var targetId = behaviorElement.getAttribute('target');
          var showIndicatorIds = behaviorElement.getAttribute(
            'show-during-load',
          );
          var hideIndicatorIds = behaviorElement.getAttribute(
            'hide-during-load',
          );
          var delay = behaviorElement.getAttribute('delay');
          var once = behaviorElement.getAttribute('once');
          onUpdate(href, action, element, {
            verb: verb,
            targetId: targetId,
            showIndicatorIds: showIndicatorIds,
            hideIndicatorIds: hideIndicatorIds,
            delay: delay,
            once: once,
          });
        };
      }
      return function() {
        return onUpdate(null, action, element, {
          custom: true,
          behaviorElement: behaviorElement,
        });
      };
    };
    _this.state = { refreshing: false, pressed: false };
    _this.pressTriggerPropNames = {
      press: 'onPress',
      longPress: 'onLongPress',
      pressIn: 'onPressIn',
      pressOut: 'onPressOut',
    };
    _this.pressTriggers = ['press', 'longPress', 'pressIn', 'pressOut'];
    _this.navActions = ['push', 'new', 'back', 'close', 'navigate'];
    _this.updateActions = ['replace', 'replace-inner', 'append', 'prepend'];
    return _this;
  }
  _createClass(HyperRef, [
    {
      key: 'render',
      value: function render() {
        var _this2 = this;
        var _state = this.state,
          refreshing = _state.refreshing,
          pressed = _state.pressed;
        var _props = this.props,
          element = _props.element,
          stylesheets = _props.stylesheets,
          animations = _props.animations,
          onUpdate = _props.onUpdate,
          options = _props.options;
        var behaviorElements = getBehaviorElements(element);
        var pressBehaviors = behaviorElements.filter(function(e) {
          return (
            _this2.pressTriggers.indexOf(
              e.getAttribute('trigger') || 'press',
            ) >= 0
          );
        });
        var visibleBehaviors = behaviorElements.filter(function(e) {
          return e.getAttribute('trigger') === 'visible';
        });
        var refreshBehaviors = behaviorElements.filter(function(e) {
          return e.getAttribute('trigger') === 'refresh';
        });
        var renderedComponent = Render.renderElement(
          element,
          stylesheets,
          animations,
          onUpdate,
          _extends({}, options, { pressed: pressed, skipHref: true }),
        );
        var styleAttr = element.getAttribute('href-style');
        var hrefStyle = styleAttr
          ? styleAttr.split(' ').map(function(s) {
              return stylesheets.regular[s];
            })
          : null;
        if (pressBehaviors.length > 0) {
          var props = { activeOpacity: 1, style: hrefStyle };
          var time = 0;
          pressBehaviors.forEach(function(behaviorElement) {
            var trigger = behaviorElement.getAttribute('trigger') || 'press';
            var triggerPropName = _this2.pressTriggerPropNames[trigger];
            var handler = _this2.createActionHandler(
              element,
              behaviorElement,
              onUpdate,
            );
            if (props[triggerPropName]) {
              var oldHandler = props[triggerPropName];
              props[triggerPropName] = function() {
                oldHandler();
                setTimeout(handler, time);
                time += 1;
              };
            } else {
              props[triggerPropName] = handler;
            }
          });
          if (props.onPressIn) {
            var oldHandler = props.onPressIn;
            props.onPressIn = function() {
              _this2.setState({ pressed: true });
              oldHandler();
            };
          } else {
            props.onPressIn = function() {
              _this2.setState({ pressed: true });
            };
          }
          if (props.onPressOut) {
            var _oldHandler = props.onPressOut;
            props.onPressOut = function() {
              _this2.setState({ pressed: false });
              _oldHandler();
            };
          } else {
            props.onPressOut = function() {
              _this2.setState({ pressed: false });
            };
          }
          if (props.onPressOut && props.onPress) {
            var onPressHandler = props.onPress;
            props.onPress = function() {
              setTimeout(onPressHandler, time);
            };
          }
          renderedComponent = _react2.default.createElement(
            _reactNative.TouchableOpacity,
            props,
            renderedComponent,
          );
        }
        if (refreshBehaviors.length > 0) {
          var refreshHandlers = refreshBehaviors.map(function(behaviorElement) {
            return _this2.createActionHandler(
              element,
              behaviorElement,
              onUpdate,
            );
          });
          var onRefresh = function onRefresh() {
            return refreshHandlers.forEach(function(h) {
              return h();
            });
          };
          var refreshControl = _react2.default.createElement(
            _reactNative.RefreshControl,
            { refreshing: refreshing, onRefresh: onRefresh },
          );
          renderedComponent = _react2.default.createElement(
            _reactNative.ScrollView,
            { refreshControl: refreshControl, style: hrefStyle },
            renderedComponent,
          );
        }
        if (visibleBehaviors.length > 0) {
          var visibleHandlers = visibleBehaviors.map(function(behaviorElement) {
            return _this2.createActionHandler(
              element,
              behaviorElement,
              onUpdate,
            );
          });
          var onVisible = function onVisible() {
            return visibleHandlers.forEach(function(h) {
              return h();
            });
          };
          renderedComponent = _react2.default.createElement(
            _VisibilityDetectingView2.default,
            { onVisible: onVisible, style: hrefStyle },
            renderedComponent,
          );
        }
        return renderedComponent;
      },
    },
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        var _this3 = this;
        var _props2 = this.props,
          element = _props2.element,
          onUpdate = _props2.onUpdate;
        if (prevProps.element === element) {
          return;
        }
        var behaviorElements = getBehaviorElements(element);
        var loadBehaviors = behaviorElements.filter(function(e) {
          return e.getAttribute('trigger') === 'load';
        });
        loadBehaviors.forEach(function(behaviorElement) {
          var handler = _this3.createActionHandler(
            element,
            behaviorElement,
            onUpdate,
          );
          setTimeout(handler, 0);
        });
      },
    },
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this4 = this;
        var _props3 = this.props,
          element = _props3.element,
          onUpdate = _props3.onUpdate;
        var behaviorElements = getBehaviorElements(element);
        var loadBehaviors = behaviorElements.filter(function(e) {
          return e.getAttribute('trigger') === 'load';
        });
        loadBehaviors.forEach(function(behaviorElement) {
          var handler = _this4.createActionHandler(
            element,
            behaviorElement,
            onUpdate,
          );
          setTimeout(handler, 0);
        });
      },
    },
  ]);
  return HyperRef;
})(_react2.default.Component);
function addHref(
  component,
  element,
  stylesheets,
  animations,
  onUpdate,
  options,
) {
  var href = element.getAttribute('href');
  var behaviorElements = getChildElementsByTagName(element, 'behavior');
  var hasBehaviors = href || behaviorElements.length > 0;
  if (!hasBehaviors) {
    return component;
  }
  return _react2.default.createElement.apply(
    _react2.default,
    [
      HyperRef,
      {
        element: element,
        stylesheets: stylesheets,
        animations: animations,
        onUpdate: onUpdate,
        options: options,
      },
    ].concat(
      _toConsumableArray(
        Render.renderChildren(
          element,
          stylesheets,
          animations,
          onUpdate,
          options,
        ),
      ),
    ),
  );
}
function getHrefKey(href) {
  return href.split('?')[0];
}
function getAncestorByTagName(element, tagName) {
  var parentNode = element.parentNode;
  while (parentNode !== null && parentNode.tagName !== tagName) {
    parentNode = parentNode.parentNode || null;
  }
  return parentNode;
}
function getChildElementsByTagName(element, tagName) {
  return Array.from(element.childNodes).filter(function(n) {
    return n.nodeType === 1 && n.tagName === tagName;
  });
}
function getBehaviorElements(element) {
  var behaviorElements = Array.from(element.childNodes).filter(function(n) {
    return n.tagName === 'behavior';
  });
  if (element.getAttribute('href')) {
    behaviorElements.unshift(element);
  }
  return behaviorElements;
}
function image(element, stylesheets, animations, onUpdate, options) {
  var _ref = options || {},
    skipHref = _ref.skipHref;
  var imageProps = {};
  if (element.getAttribute('source')) {
    var source = element.getAttribute('source');
    source = (0, _urlParse2.default)(
      source,
      options.screenUrl,
      true,
    ).toString();
    imageProps.source = { uri: source };
  }
  var props = _extends(
    (0, _services.createProps)(element, stylesheets, animations, options),
    imageProps,
  );
  var component = _react2.default.createElement(
    props.animations ? _reactNative.Animated.Image : _reactNative.Image,
    props,
  );
  return skipHref
    ? component
    : addHref(component, element, stylesheets, animations, onUpdate, options);
}
function view(element, stylesheets, animations, onUpdate, options) {
  var viewOptions = options;
  var _ref2 = viewOptions || {},
    skipHref = _ref2.skipHref;
  var props = (0, _services.createProps)(
    element,
    stylesheets,
    animations,
    viewOptions,
  );
  var scrollable = !!element.getAttribute('scroll');
  var c = _reactNative.View;
  var inputRefs = [];
  if (props.animations) {
    c = scrollable
      ? _reactNative.Animated.ScrollView
      : _reactNative.Animated.View;
  } else if (scrollable) {
    var textFields = element.getElementsByTagNameNS(HYPERVIEW_NS, 'text-field');
    var textAreas = element.getElementsByTagNameNS(HYPERVIEW_NS, 'text-area');
    var hasFields = textFields.length > 0 || textAreas.length > 0;
    c = hasFields
      ? _reactNativeKeyboardAwareScrollview.KeyboardAwareScrollView
      : _reactNative.ScrollView;
    if (hasFields) {
      props.extraScrollHeight = 32;
      props.keyboardOpeningTime = 0;
      props.keyboardShouldPersistTaps = 'handled';
      props.scrollEventThrottle = 16;
      props.getTextInputRefs = function() {
        return inputRefs;
      };
      var registerInputHandler = function registerInputHandler(ref) {
        return inputRefs.push(ref);
      };
      viewOptions = _extends({}, viewOptions, {
        registerInputHandler: registerInputHandler,
      });
    }
  }
  if (scrollable) {
    var scrollDirection = element.getAttribute('scroll-orientation');
    if (scrollDirection === 'horizontal') {
      props.horizontal = true;
    }
  }
  var component = _react2.default.createElement.apply(
    _react2.default,
    [c, props].concat(
      _toConsumableArray(
        Render.renderChildren(
          element,
          stylesheets,
          animations,
          onUpdate,
          viewOptions,
        ),
      ),
    ),
  );
  return skipHref
    ? component
    : addHref(
        component,
        element,
        stylesheets,
        animations,
        onUpdate,
        viewOptions,
      );
}
function text(element, stylesheets, animations, onUpdate, options) {
  var _ref3 = options || {},
    skipHref = _ref3.skipHref;
  var props = (0, _services.createProps)(
    element,
    stylesheets,
    animations,
    options,
  );
  var component = _react2.default.createElement.apply(
    _react2.default,
    [
      props.animations ? _reactNative.Animated.Text : _reactNative.Text,
      props,
    ].concat(
      _toConsumableArray(
        Render.renderChildren(
          element,
          stylesheets,
          animations,
          onUpdate,
          options,
        ),
      ),
    ),
  );
  return skipHref
    ? component
    : addHref(component, element, stylesheets, animations, onUpdate, options);
}
function createAnimations(element) {
  var animatedValues = {};
  var animatedTimings = {};
  var animatedProperties = {};
  var returnValue = {
    values: animatedValues,
    timings: animatedTimings,
    properties: animatedProperties,
  };
  if (!element) {
    return returnValue;
  }
  var animated = (0, _services.getFirstTag)(element, 'animated');
  if (!animated) {
    return returnValue;
  }
  var childElements =
    Array.from(animated.childNodes).filter(function(n) {
      return n.nodeType === 1;
    }) || [];
  var valueElements = childElements.filter(function(e) {
    return e.tagName === 'value';
  });
  var animationElements = childElements.filter(function(e) {
    return e.tagName === 'animation';
  });
  valueElements.forEach(function(v) {
    var id = v.getAttribute('id');
    var fromValue = parseInt(v.getAttribute('from'), 10);
    var property = v.getAttribute('property');
    animatedValues[id] = new _reactNative.Animated.Value(fromValue);
    animatedProperties[id] = property;
  });
  animationElements.forEach(function(v) {
    var id = v.getAttribute('id');
    animatedTimings[id] = createAnimation(v, animatedValues);
  });
  return returnValue;
}
function createAnimation(element, animatedValues) {
  var type = element.getAttribute('type');
  if (type === 'sequence' || type === 'parallel') {
    var animations = Array.from(element.childNodes)
      .filter(function(n) {
        return n.nodeType === 1;
      })
      .map(function(e) {
        return createAnimation(e, animatedValues);
      });
    var animation =
      type === 'sequence'
        ? _reactNative.Animated.sequence(animations)
        : _reactNative.Animated.parallel(animations);
    if (element.getAttribute('loop')) {
      animation = _reactNative.Animated.loop(animation);
    }
    return animation;
  } else if (type === 'delay') {
    var _duration = parseInt(element.getAttribute('duration'), 10);
    return _reactNative.Animated.delay(_duration);
  }
  var value = element.getAttribute('value');
  var toValue = parseFloat(element.getAttribute('to'));
  var duration = parseInt(element.getAttribute('duration'), 10);
  var delay = parseInt(element.getAttribute('delay'), 10);
  var easingFunc = element.getAttribute('easing') || 'linear';
  var easing = _reactNative.Easing[easingFunc]();
  return _reactNative.Animated.timing(animatedValues[value], {
    toValue: toValue,
    duration: duration,
    delay: delay,
    easing: easing,
  });
}
var HyperScreen = (function(_React$Component2) {
  _inherits(HyperScreen, _React$Component2);
  function HyperScreen(props) {
    _classCallCheck(this, HyperScreen);
    var _this5 = _possibleConstructorReturn(
      this,
      (HyperScreen.__proto__ || Object.getPrototypeOf(HyperScreen)).call(
        this,
        props,
      ),
    );
    _this5.load = function() {
      var delay = _this5.props.navigation.state.params.delay;
      var url = _this5.state.url;
      var fetchPromise = function fetchPromise() {
        return _this5.props
          .fetch(url, { headers: getHyperviewHeaders() })
          .then(function(response) {
            if (!response.ok) {
              throw Error(response.statusText);
            }
            return response.text();
          })
          .then(function(responseText) {
            var doc = _this5.parser.parseFromString(responseText);
            var animations = createAnimations(doc);
            var stylesheets = Stylesheets.createStylesheets(doc);
            ROUTE_KEYS[getHrefKey(url)] = _this5.props.navigation.state.key;
            Object.entries(animations.timings).forEach(function(_ref4) {
              var _ref5 = _slicedToArray(_ref4, 2),
                key = _ref5[0],
                timing = _ref5[1];
              timing.start();
            });
            _this5.setState({
              doc: doc,
              styles: stylesheets,
              animations: animations,
              error: false,
            });
          })
          .catch(function(reason) {
            _this5.setState({ error: true });
            throw reason;
          });
      };
      if (delay) {
        later(parseInt(delay, 10)).then(fetchPromise);
      } else {
        fetchPromise();
      }
    };
    _this5.reload = function() {
      _this5.needsLoad = true;
      _this5.setState({ error: false });
    };
    _this5.getNavigation = function() {
      return {
        back: _this5.props.back,
        push: _this5.props.push,
        replace: _this5.props.replace,
        navigate: _this5.props.navigate,
        openModal: _this5.props.openModal,
        closeModal: _this5.props.closeModal,
      };
    };
    _this5.getUrlFromHref = function(href) {
      var rootUrl = (0, _urlParse2.default)(href, _this5.state.url, true);
      return rootUrl.toString();
    };
    _this5.fetchElement = function(href, verb, root, formData) {
      verb = verb || 'GET';
      if (href.startsWith('#')) {
        return new Promise(function(resolve, reject) {
          var element = root.getElementById(href.slice(1));
          if (element) {
            resolve(element.cloneNode(true));
          }
          reject();
        });
      }
      var url = _this5.getUrlFromHref(href);
      if (verb === 'GET' && formData) {
        var queryString = formData
          .getParts()
          .map(function(e) {
            return (
              encodeURIComponent(e.fieldName) +
              '=' +
              encodeURIComponent(e.string)
            );
          })
          .join('&');
        url = url + '?' + queryString;
      }
      var options = {
        method: verb,
        headers: getHyperviewHeaders(),
        body: verb === 'GET' ? undefined : formData,
      };
      return _this5.props
        .fetch(url, options)
        .then(function(response) {
          return response.text();
        })
        .then(function(responseText) {
          return _this5.parser.parseFromString(responseText).documentElement;
        });
    };
    _this5.getFormData = function(element) {
      var formElement = getAncestorByTagName(element, 'form');
      if (!formElement) {
        return null;
      }
      var formData = new FormData();
      ['text-area', 'text-field', 'select-single', 'select-multiple']
        .reduce(function(acc, tag) {
          return acc.concat(
            Array.from(formElement.getElementsByTagNameNS(HYPERVIEW_NS, tag)),
          );
        }, [])
        .forEach(function(input) {
          var name = input.getAttribute('name');
          if (
            input.tagName === 'select-single' ||
            input.tagName === 'select-multiple'
          ) {
            Array.from(input.getElementsByTagNameNS(HYPERVIEW_NS, 'option'))
              .filter(function(opt) {
                return opt.getAttribute('selected') === 'true';
              })
              .forEach(function(opt) {
                return formData.append(name, opt.getAttribute('value'));
              });
          } else {
            formData.append(name, input.getAttribute('value'));
          }
        });
      return formData;
    };
    _this5.onUpdate = function(href, action, currentElement, opts) {
      if (_this5.navActions.indexOf(action) >= 0) {
        _this5.onNavigate(href, action, currentElement, opts);
      } else if (_this5.updateActions.indexOf(action) >= 0) {
        _this5.onUpdateFragment(href, action, currentElement, opts);
      } else if (action === 'swap') {
        _this5.onSwap(currentElement, opts.newElement);
      } else {
        var behaviorElement = opts.behaviorElement;
        _this5.onCustomUpdate(behaviorElement);
      }
    };
    _this5.onNavigate = function(href, action, element, opts) {
      var navigation = _this5.getNavigation();
      var showIndicatorId = opts.showIndicatorId,
        delay = opts.delay;
      var navFunction = navigation.push;
      var key = null;
      var url = _this5.getUrlFromHref(href);
      if (action === 'push') {
        navFunction = navigation.push;
      } else if (action === 'replace') {
        navFunction = navigation.replace;
      } else if (action === 'navigate') {
        navFunction = navigation.navigate;
        key = ROUTE_KEYS[getHrefKey(url)];
      } else if (action === 'new') {
        navFunction = navigation.openModal;
      } else if (action === 'close') {
        navFunction = navigation.closeModal;
      } else if (action === 'back') {
        navFunction = navigation.back;
      }
      var navHandler = function navHandler() {
        var preloadScreen = null;
        if (showIndicatorId) {
          var screens = _this5.state.doc.getElementsByTagNameNS(
            HYPERVIEW_NS,
            'screen',
          );
          preloadScreen = uid();
          PRELOAD_SCREEN[preloadScreen] = Array.from(screens).find(function(s) {
            return s.getAttribute('id') === showIndicatorId;
          });
        }
        var routeParams =
          (action === 'back' || action === 'close') && href === '#'
            ? undefined
            : { url: url, preloadScreen: preloadScreen, delay: delay };
        navFunction(routeParams, key);
      };
      navHandler();
    };
    _this5.onUpdateFragment = function(href, action, currentElement, opts) {
      var options = opts || {};
      var verb = options.verb,
        targetId = options.targetId,
        showIndicatorIds = options.showIndicatorIds,
        hideIndicatorIds = options.hideIndicatorIds,
        delay = options.delay,
        once = options.once,
        onEnd = options.onEnd,
        behaviorElement = options.behaviorElement;
      var formData = _this5.getFormData(currentElement);
      if (once && currentElement.getAttribute('ran-once')) {
        onEnd && onEnd();
        return;
      }
      var newRoot = _this5.state.doc;
      var changedIndicator = false;
      if (showIndicatorIds) {
        showIndicatorIds.split(' ').forEach(function(id) {
          var el = newRoot.getElementById(id);
          if (el) {
            el.setAttribute('hide', 'false');
            newRoot = _this5.shallowCloneToRoot(el.parentNode);
            changedIndicator = true;
          }
        });
      }
      if (hideIndicatorIds) {
        hideIndicatorIds.split(' ').forEach(function(id) {
          var el = newRoot.getElementById(id);
          if (el) {
            el.setAttribute('hide', 'true');
            newRoot = _this5.shallowCloneToRoot(el.parentNode);
            changedIndicator = true;
          }
        });
      }
      if (changedIndicator) {
        _this5.setState({ doc: newRoot });
      }
      var fetchPromise = function fetchPromise() {
        return _this5
          .fetchElement(href, verb, newRoot, formData)
          .then(function(newElement) {
            if (once) {
              currentElement.setAttribute('ran-once', 'true');
              newRoot = _this5.shallowCloneToRoot(currentElement.parentNode);
            }
            var targetElement = targetId
              ? newRoot.getElementById(targetId)
              : currentElement;
            if (!targetElement) {
              targetElement = currentElement;
            }
            if (action === 'replace') {
              var parentElement = targetElement.parentNode;
              parentElement.replaceChild(newElement, targetElement);
              newRoot = _this5.shallowCloneToRoot(parentElement);
            }
            if (action === 'replace-inner') {
              var child = targetElement.firstChild;
              while (child !== null) {
                var nextChild = child.nextSibling;
                targetElement.removeChild(child);
                child = nextChild;
              }
              targetElement.appendChild(newElement);
              newRoot = _this5.shallowCloneToRoot(targetElement);
            }
            if (action === 'append') {
              targetElement.appendChild(newElement);
              newRoot = _this5.shallowCloneToRoot(targetElement);
            }
            if (action === 'prepend') {
              targetElement.insertBefore(newElement, targetElement.firstChild);
              newRoot = _this5.shallowCloneToRoot(targetElement);
            }
            if (showIndicatorIds) {
              showIndicatorIds.split(' ').forEach(function(id) {
                var el = newRoot.getElementById(id);
                if (el) {
                  el.setAttribute('hide', 'true');
                  newRoot = _this5.shallowCloneToRoot(el.parentNode);
                  changedIndicator = true;
                }
              });
            }
            if (hideIndicatorIds) {
              hideIndicatorIds.split(' ').forEach(function(id) {
                var el = newRoot.getElementById(id);
                if (el) {
                  el.setAttribute('hide', 'false');
                  newRoot = _this5.shallowCloneToRoot(el.parentNode);
                  changedIndicator = true;
                }
              });
            }
            _this5.setState({ doc: newRoot });
            onEnd && onEnd();
          });
      };
      if (delay) {
        later(parseInt(delay, 10)).then(fetchPromise);
      } else {
        fetchPromise();
      }
    };
    _this5.onSwap = function(currentElement, newElement) {
      var parentElement = currentElement.parentNode;
      parentElement.replaceChild(newElement, currentElement);
      var newRoot = _this5.shallowCloneToRoot(parentElement);
      _this5.setState({ doc: newRoot });
    };
    _this5.onCustomUpdate = function(behaviorElement) {
      var action = behaviorElement.getAttribute('action');
      if (action === 'redux') {
        var reduxAction = behaviorElement.getAttributeNS(REDUX_NS, 'action');
        var extraNode = behaviorElement.getAttributeNodeNS(REDUX_NS, 'extra');
        if (reduxAction && _this5.props.dispatchReduxAction) {
          var extra = extraNode ? JSON.parse(extraNode.value) : null;
          _this5.props.dispatchReduxAction(
            _extends({ type: reduxAction }, extra),
          );
        }
      } else if (action === 'intercom') {
        var intercomAction = behaviorElement.getAttributeNS(
          INTERCOM_NS,
          'action',
        );
        if (intercomAction === 'open' && _this5.props.openHelpDesk) {
          var topic = behaviorElement.getAttributeNS(INTERCOM_NS, 'topic');
          _this5.props.openHelpDesk(topic);
        }
      } else if (action === 'amplitude') {
        var name = behaviorElement.getAttributeNS(AMPLITUDE_NS, 'event');
        if (name && _this5.props.logEvent) {
          var propNode = behaviorElement.getAttributeNodeNS(
            AMPLITUDE_NS,
            'event-props',
          );
          var properties = propNode ? JSON.parse(propNode.value) : undefined;
          _this5.props.logEvent({ name: name, properties: properties });
        }
      } else if (action === 'phone') {
        var number = behaviorElement.getAttributeNS(PHONE_NS, 'number');
        if (number && _this5.props.onCall) {
          _this5.props.onCall(number);
        }
      } else if (action === 'ask-rating') {
        if (_this5.props.onAskRating) {
          _this5.props.onAskRating();
        }
      } else if (action === 'share') {
        var dialogTitle = behaviorElement.getAttributeNS(
          SHARE_NS,
          'dialog-title',
        );
        var message = behaviorElement.getAttributeNS(SHARE_NS, 'message');
        var subject = behaviorElement.getAttributeNS(SHARE_NS, 'subject');
        var title = behaviorElement.getAttributeNS(SHARE_NS, 'title');
        var url = behaviorElement.getAttributeNS(SHARE_NS, 'url');
        if ((message || url) && _this5.props.onShare) {
          _this5.props.onShare({
            dialogTitle: dialogTitle,
            message: message,
            subject: subject,
            title: title,
            url: url,
          });
        }
      }
    };
    _this5.shallowClone = function(element) {
      var newElement = element.cloneNode(false);
      var childNode = element.firstChild;
      while (childNode !== null) {
        var nextChild = childNode.nextSibling;
        newElement.appendChild(childNode);
        childNode = nextChild;
      }
      return newElement;
    };
    _this5.shallowCloneToRoot = function(element) {
      var elementClone = _this5.shallowClone(element);
      if (element.nodeType === 9) {
        return elementClone;
      }
      element.parentNode.replaceChild(elementClone, element);
      var parentClone = _this5.shallowCloneToRoot(element.parentNode);
      return parentClone;
    };
    _this5.navActions = ['push', 'new', 'back', 'close', 'navigate'];
    _this5.updateActions = ['replace', 'replace-inner', 'append', 'prepend'];
    _this5.parser = new _xmldom.DOMParser();
    _this5.needsLoad = false;
    _this5.state = { styles: null, doc: null, url: null, error: false };
    _this5.onUpdate = _this5.onUpdate.bind(_this5);
    _this5.shallowClone = _this5.shallowClone.bind(_this5);
    _this5.shallowCloneToRoot = _this5.shallowCloneToRoot.bind(_this5);
    _this5.reload = _this5.reload.bind(_this5);
    _this5.componentRegistry = Components.getRegistry(_this5.props.components);
    return _this5;
  }
  _createClass(HyperScreen, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        var url =
          this.props.navigation.state.params.url ||
          this.props.entrypointUrl ||
          null;
        var preloadScreen = this.props.navigation.state.params.preloadScreen
          ? PRELOAD_SCREEN[this.props.navigation.state.params.preloadScreen]
          : null;
        var preloadStyles = preloadScreen
          ? Stylesheets.createStylesheets(preloadScreen)
          : {};
        var animations = createAnimations(preloadScreen);
        this.needsLoad = true;
        if (preloadScreen) {
          this.setState({
            doc: preloadScreen,
            styles: preloadStyles,
            error: false,
            url: url,
            animations: animations,
          });
        } else {
          this.setState({ error: false, url: url });
        }
      },
    },
    {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        var newUrl = nextProps.navigation.state.params.url;
        var oldUrl = this.props.navigation.state.params.url;
        var newPreloadScreen = nextProps.navigation.state.params.preloadScreen;
        var oldPreloadScreen = this.props.navigation.state.params.preloadScreen;
        if (newPreloadScreen !== oldPreloadScreen) {
          delete PRELOAD_SCREEN[oldPreloadScreen];
        }
        if (newUrl !== oldUrl) {
          this.needsLoad = true;
          var preloadScreen = newPreloadScreen
            ? PRELOAD_SCREEN[newPreloadScreen]
            : null;
          var doc = preloadScreen || this.state.doc;
          var styles = preloadScreen
            ? Stylesheets.createStylesheets(preloadScreen)
            : this.state.styles;
          var animations = preloadScreen
            ? createAnimations(preloadScreen)
            : this.state.animations;
          Object.entries(animations.timings).forEach(function(_ref6) {
            var _ref7 = _slicedToArray(_ref6, 2),
              key = _ref7[0],
              timing = _ref7[1];
            timing.start();
          });
          this.setState({
            doc: doc,
            styles: styles,
            animations: animations,
            url: newUrl,
          });
        }
      },
    },
    {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        var preloadScreen = this.props.navigation.state.params.preloadScreen;
        if (preloadScreen && PRELOAD_SCREEN[preloadScreen]) {
          delete PRELOAD_SCREEN[preloadScreen];
        }
      },
    },
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps, prevState) {
        if (this.needsLoad) {
          this.load(this.state.url);
          this.needsLoad = false;
        }
      },
    },
    {
      key: 'render',
      value: function render() {
        var _state2 = this.state,
          doc = _state2.doc,
          url = _state2.url,
          error = _state2.error;
        if (error) {
          return _react2.default.createElement(
            _reactNative.View,
            {
              style: {
                backgroundColor: 'white',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              },
              __source: { fileName: _jsxFileName, lineNumber: 657 },
            },
            _react2.default.createElement(
              _reactNative.Text,
              { __source: { fileName: _jsxFileName, lineNumber: 658 } },
              'An error occured',
            ),
            _react2.default.createElement(
              _reactNative.TouchableOpacity,
              {
                onPress: this.reload,
                __source: { fileName: _jsxFileName, lineNumber: 659 },
              },
              _react2.default.createElement(
                _reactNative.Text,
                {
                  style: { color: '#4778FF', marginTop: 16 },
                  __source: { fileName: _jsxFileName, lineNumber: 660 },
                },
                'Reload',
              ),
            ),
          );
        }
        if (!doc) {
          return _react2.default.createElement(
            _reactNative.View,
            {
              style: {
                backgroundColor: 'white',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              },
              __source: { fileName: _jsxFileName, lineNumber: 667 },
            },
            _react2.default.createElement(_reactNative.ActivityIndicator, {
              __source: { fileName: _jsxFileName, lineNumber: 668 },
            }),
          );
        }
        var body = this.state.doc.getElementsByTagNameNS(
          HYPERVIEW_NS,
          'body',
        )[0];
        return Render.renderElement(
          body,
          this.state.styles,
          this.state.animations,
          this.onUpdate,
          { screenUrl: url, componentRegistry: this.componentRegistry },
        );
      },
    },
  ]);
  return HyperScreen;
})(_react2.default.Component);
HyperScreen.createProps = _services.createProps;
HyperScreen.renderChildren = Render.renderChildren;
exports.default = HyperScreen;