Object.defineProperty(exports, '__esModule', { value: true });
exports.createProps = exports.getFirstTag = exports.getBehaviorElements = undefined;
var _namespaces = require('./namespaces');
var Namespaces = _interopRequireWildcard(_namespaces);
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
var getBehaviorElements = (exports.getBehaviorElements = function getBehaviorElements(
  element,
) {
  var behaviorElements = Array.from(element.childNodes).filter(function(n) {
    return n.tagName === 'behavior';
  });
  if (element.getAttribute('href')) {
    behaviorElements.unshift(element);
  }
  return behaviorElements;
});
var getFirstTag = (exports.getFirstTag = function getFirstTag(
  document,
  localName,
) {
  var elements = document.getElementsByTagNameNS(
    Namespaces.HYPERVIEW,
    localName,
  );
  if (elements && elements[0]) {
    return elements[0];
  }
  return null;
});
var createProps = (exports.createProps = function createProps(
  element,
  stylesheets,
  animations,
  options,
) {
  var numericRules = ['numberOfLines'];
  var booleanRules = ['multiline'];
  var props = {};
  if (!element.attributes) {
    return props;
  }
  for (var i = 0; i < element.attributes.length; i += 1) {
    var attr = element.attributes.item(i);
    if (attr) {
      if (numericRules.indexOf(attr.name) >= 0) {
        var intValue = parseInt(attr.value, 10);
        props[attr.name] = intValue || 0;
      } else if (booleanRules.indexOf(attr.name) >= 0) {
        props[attr.name] = attr.value === 'true';
      } else {
        props[attr.name] = attr.value;
        if (attr.name === 'id') {
          props.testId = attr.value;
        }
      }
    }
  }
  if (props.style) {
    var styleIds = props.style.split(' ');
    var styleRules = styleIds.map(function(s) {
      return stylesheets.regular[s];
    });
    if (options.pressed) {
      var pressedRules = styleIds
        .map(function(s) {
          return stylesheets.pressed[s];
        })
        .filter(function(r) {
          return !!r;
        });
      if (pressedRules.length === 0) {
        pressedRules = [{ opacity: 0.7 }];
      }
      styleRules = styleRules.concat(pressedRules);
    }
    if (options.focused) {
      var focusedRules = styleIds
        .map(function(s) {
          return stylesheets.focused[s];
        })
        .filter(function(r) {
          return !!r;
        });
      styleRules = styleRules.concat(focusedRules);
    }
    if (options.selected) {
      var selectedRules = styleIds
        .map(function(s) {
          return stylesheets.selected[s];
        })
        .filter(function(r) {
          return !!r;
        });
      styleRules = styleRules.concat(selectedRules);
    }
    if (options.pressedSelected) {
      var pressedSelectedRules = styleIds
        .map(function(s) {
          return stylesheets.pressedSelected[s];
        })
        .filter(function(r) {
          return !!r;
        });
      styleRules = styleRules.concat(pressedSelectedRules);
    }
    props.style = styleRules;
  }
  if (props.animatedValues) {
    props.animatedValues.split(' ').forEach(function(v) {
      if (animations) {
        var value = animations.values[v];
        var property = animations.properties[v];
        if (value !== undefined && property !== undefined) {
          var animatedStyle = {};
          animatedStyle[property] = value;
          props.style = props.style || [];
          props.style.push(animatedStyle);
        }
      }
    });
  }
  return props;
});