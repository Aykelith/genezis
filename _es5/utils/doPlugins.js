"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.object.values");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.PLUGIN_ARGS_REQUIREMENTS_KEYWORD = void 0;

require("regenerator-runtime/runtime");

var _Checker = _interopRequireDefault(require("../Checker"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var isProduction = process.env.NODE_ENV == "production";
var GenezisCheckerSettingsConfig = {};
var PLUGIN_ARGS_REQUIREMENTS_KEYWORD = "pluginArgsRequirements";
exports.PLUGIN_ARGS_REQUIREMENTS_KEYWORD = PLUGIN_ARGS_REQUIREMENTS_KEYWORD;

function constructPluginObjectArgument(plugin, args) {
  if (!isProduction) {
    if (!plugin[PLUGIN_ARGS_REQUIREMENTS_KEYWORD]) throw new Error("The plugin \"".concat(plugin.name, "\" doesn't have the \"").concat(PLUGIN_ARGS_REQUIREMENTS_KEYWORD, "\""));
    plugin[PLUGIN_ARGS_REQUIREMENTS_KEYWORD].forEach(function (requirement) {
      if (args[requirement] === undefined) throw new Error("The requirement \"".concat(requirement, "\" of plugin \"").concat(plugin.name, "\" is not given in the plugin arguments"));
    });
  }

  var pluginArgs = {};
  plugin[PLUGIN_ARGS_REQUIREMENTS_KEYWORD].forEach(function (requirement) {
    pluginArgs[requirement] = args[requirement];
  });
  return pluginArgs;
}

var _callee = function _callee(plugins, args, settings) {
  var arePluginsArray, _plugins, answers, pluginsNames, i, length, answer, j, length2, _settings$onError$exe;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          arePluginsArray = Array.isArray(plugins);
          _plugins = arePluginsArray ? plugins : Object.values(plugins);
          answers = [];
          args.pluginsAnswers = answers;

          if (settings.runParallel) {
            _context.next = 31;
            break;
          }

          i = 0, length = _plugins.length;

        case 6:
          if (!(i < length)) {
            _context.next = 31;
            break;
          }

          console.log("Doing plugin ".concat(i + 1, "/").concat(length));
          _context.prev = 8;
          _context.next = 11;
          return regeneratorRuntime.awrap(_plugins[i](constructPluginObjectArgument(_plugins[i], args)));

        case 11:
          answer = _context.sent;
          answers.push(answer);
          _context.next = 28;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](8);

          if (!settings.onError) {
            _context.next = 28;
            break;
          }

          if (!settings.onError.crashImmediatly) {
            _context.next = 28;
            break;
          }

          if (!settings.onError.executePlugins) {
            _context.next = 27;
            break;
          }

          j = 0, length2 = settings.onError.executePlugins.length;

        case 21:
          if (!(j < length2)) {
            _context.next = 27;
            break;
          }

          _context.next = 24;
          return regeneratorRuntime.awrap((_settings$onError$exe = settings.onError.executePlugins)[j].apply(_settings$onError$exe, [_context.t0].concat(_toConsumableArray(args))));

        case 24:
          ++j;
          _context.next = 21;
          break;

        case 27:
          throw _context.t0;

        case 28:
          ++i;
          _context.next = 6;
          break;

        case 31:
          return _context.abrupt("return", answers);

        case 32:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[8, 15]]);
};

exports["default"] = _callee;