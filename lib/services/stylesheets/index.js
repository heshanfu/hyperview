Object.defineProperty(exports, '__esModule', { value: true });
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
exports.createStylesheets = createStylesheets;
var _namespaces = require('../namespaces');
var Namespaces = _interopRequireWildcard(_namespaces);
var _reactNative = require('react-native');
var _ = require('..');
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
var NUMBER_REGEX = /^\d+$/;
function string(value) {
  return value;
}
function number(value) {
  return parseInt(value, 10);
}
function floatNumber(value) {
  return parseFloat(value);
}
function numberOrPercent(value) {
  return value.indexOf('%') >= 0 ? value : number(value);
}
function numberOrString(value) {
  return NUMBER_REGEX.test(value) ? number(value) : value;
}
var STYLE_ATTRIBUTE_CONVERTERS = {
  alignContent: string,
  alignItems: string,
  alignSelf: string,
  borderBottomWidth: number,
  borderLeftWidth: number,
  borderRightWidth: number,
  borderTopWidth: number,
  borderWidth: number,
  bottom: numberOrPercent,
  display: string,
  flex: number,
  flexBasis: number,
  flexDirection: string,
  flexGrow: number,
  flexShrink: number,
  flexWrap: string,
  height: numberOrPercent,
  justifyContent: string,
  left: numberOrPercent,
  margin: numberOrPercent,
  marginBottom: numberOrPercent,
  marginHorizontal: numberOrPercent,
  marginLeft: numberOrPercent,
  marginRight: numberOrPercent,
  marginTop: numberOrPercent,
  marginVertical: numberOrPercent,
  maxHeight: numberOrPercent,
  maxWidth: numberOrPercent,
  minHeight: numberOrPercent,
  minWidth: numberOrPercent,
  overflow: string,
  padding: numberOrString,
  paddingBottom: numberOrPercent,
  paddingHorizontal: numberOrPercent,
  paddingLeft: numberOrPercent,
  paddingRight: numberOrPercent,
  paddingTop: numberOrPercent,
  paddingVertical: numberOrPercent,
  position: string,
  right: numberOrPercent,
  top: numberOrPercent,
  width: numberOrPercent,
  borderRightColor: string,
  borderBottomColor: string,
  borderBottomLeftRadius: number,
  borderBottomRightRadius: number,
  borderColor: string,
  borderLeftColor: string,
  borderRadius: number,
  backgroundColor: string,
  borderStyle: string,
  borderTopColor: string,
  borderTopLeftRadius: number,
  borderTopRightRadius: number,
  opacity: floatNumber,
  color: string,
  fontSize: number,
  fontStyle: string,
  fontWeight: string,
  lineHeight: number,
  textAlign: string,
  textShadowColor: string,
  fontFamily: string,
  textShadowRadius: number,
};
function createStylesheet(document) {
  var modifiers =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var styles = (0, _.getFirstTag)(document, 'styles');
  var stylesheet = {};
  if (styles) {
    var styleElements = styles.getElementsByTagNameNS(
      Namespaces.HYPERVIEW,
      'style',
    );
    for (var i = 0; i < styleElements.length; i += 1) {
      var styleElement = styleElements.item(i);
      var hasModifier =
        styleElement.parentNode &&
        styleElement.parentNode.tagName === 'modifier';
      var styleId = styleElement.getAttribute('id');
      if (hasModifier) {
        styleId = styleElement.parentNode.parentNode.getAttribute('id');
      }
      if (!styleId) {
        continue;
      }
      var modifierEntries = Object.entries(modifiers);
      var matchesModifiers = true;
      for (var j = 0; j < modifierEntries.length; j += 1) {
        var _modifierEntries$j = _slicedToArray(modifierEntries[j], 2),
          modifier = _modifierEntries$j[0],
          state = _modifierEntries$j[1];
        var elementModifierState =
          styleElement.parentNode.getAttribute(modifier) === 'true';
        if (elementModifierState !== state) {
          matchesModifiers = false;
          continue;
        }
      }
      if (!matchesModifiers) {
        continue;
      }
      var rules = {};
      for (var _j = 0; _j < styleElement.attributes.length; _j += 1) {
        var attr = styleElement.attributes.item(_j);
        var converter = STYLE_ATTRIBUTE_CONVERTERS[attr.name];
        if (converter) {
          rules[attr.name] = converter(attr.value);
        }
      }
      stylesheet[styleId] = rules;
    }
  }
  return _reactNative.StyleSheet.create(stylesheet);
}
function createStylesheets(document) {
  var styles = {
    regular: createStylesheet(document, {
      selected: false,
      pressed: false,
      focused: false,
    }),
    selected: createStylesheet(document, {
      selected: true,
      pressed: false,
      focused: false,
    }),
    pressed: createStylesheet(document, {
      selected: false,
      pressed: true,
      focused: false,
    }),
    focused: createStylesheet(document, {
      selected: false,
      pressed: false,
      focused: true,
    }),
    pressedSelected: createStylesheet(document, {
      selected: true,
      pressed: true,
      focused: false,
    }),
  };
  return styles;
}