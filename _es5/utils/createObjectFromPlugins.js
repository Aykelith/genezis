"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.object.define-properties");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("regenerator-runtime/runtime");

var _Checker = _interopRequireDefault(require("../Checker"));

var _deleteOnProduction = _interopRequireDefault(require("./deleteOnProduction"));

var _doPlugins = _interopRequireDefault(require("./doPlugins"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var GenezisCheckConfig = (0, _deleteOnProduction["default"])({
  data: _Checker["default"].object(),
  plugins: _Checker["default"].array({
    of: _Checker["default"]["function"]()
  }).required(),
  doPluginsSettings: _Checker["default"].object(),
  onError: _Checker["default"]["function"]().required()
});

var _callee = function _callee(data) {
  var doc;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          (0, _Checker["default"])(data, GenezisCheckConfig);
          doc = {};
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap((0, _doPlugins["default"])(data.plugins, _objectSpread({
            doc: doc
          }, data.data), data.doPluginsSettings));

        case 5:
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](2);
          data.onError(_context.t0);

        case 10:
          return _context.abrupt("return", doc);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 7]]);
};

exports["default"] = _callee;