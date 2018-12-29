var _jsxFileName = 'src/components/hv-select-single/stories/index.js';
var _helpers = require('../../../../storybook/helpers');
var Helpers = _interopRequireWildcard(_helpers);
var _ = require('..');
var _2 = _interopRequireDefault(_);
var _react = require('react');
var _react2 = _interopRequireDefault(_react);
var _addonActions = require('@storybook/addon-actions');
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
var createStory = Helpers.stories(_2.default);
createStory('basic', function(_ref) {
  var element = _ref.element,
    stylesheets = _ref.stylesheets;
  return _react2.default.createElement(_2.default, {
    animations: null,
    element: element,
    onUpdate: (0, _addonActions.action)('onUpdate'),
    options: Helpers.getOptions(),
    stylesheets: stylesheets,
    __source: { fileName: _jsxFileName, lineNumber: 18 },
  });
});