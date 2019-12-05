"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.number.constructor");

require("core-js/modules/es.number.is-integer");

require("core-js/modules/es.number.is-nan");

require("core-js/modules/es.number.parse-float");

require("core-js/modules/es.number.parse-int");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.define-properties");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.includes");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stringChecker = stringChecker;
exports.integerChecker = integerChecker;
exports.numberChecker = numberChecker;
exports.booleanChecker = booleanChecker;
exports.requiredChecker = requiredChecker;
exports.arrayChecker = arrayChecker;
exports.createGenerateOptions = createGenerateOptions;
exports.createChecker = createChecker;
exports.makeConfig = makeConfig;
exports["default"] = void 0;

var _CheckerError = _interopRequireDefault(require("./CheckerError"));

var _CheckerErrorTypes = _interopRequireDefault(require("./CheckerErrorTypes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function stringChecker() {
  var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (property, value, config, checkerSettings) {
    if (value === undefined) return;
    var isString = typeof value == "string";

    if (!isString) {
      if (settings.convert) {
        var converted = Number.parseInt(value);
        if (Number.isNaN(converted)) throw new _CheckerError["default"](_CheckerErrorTypes["default"].NOT_STRING, property, value);
        if (!checkerSettings.doNotModify) config[property] = converted;
        return converted;
      } else {
        throw new _CheckerError["default"](_CheckerErrorTypes["default"].NOT_STRING, property, value);
      }
    }

    if (settings.checker) settings.checker(value);
    return value;
  };
}

function integerChecker() {
  var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (property, value, config, checkerSettings) {
    if (value === undefined) return;
    var isInteger = Number.isInteger(value);

    if (!isInteger) {
      if (settings.convert) {
        var converted = Number.parseInt(value);
        if (Number.isNaN(converted)) throw new _CheckerError["default"](_CheckerErrorTypes["default"].NOT_INTEGER, property, value);
        if (!checkerSettings.doNotModify) config[property] = converted;
        return converted;
      } else {
        throw new _CheckerError["default"](_CheckerErrorTypes["default"].NOT_INTEGER, property, value);
      }
    }

    if (settings.checker) settings.checker(value);
    return value;
  };
}

function numberChecker() {
  var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (property, value, config, checkerSettings) {
    if (value === undefined) return;
    var isNumber = typeof value == "number";

    if (!isNumber) {
      if (settings.convert) {
        var converted = Number.parseFloat(value);
        if (Number.isNaN(converted)) throw new _CheckerError["default"](_CheckerErrorTypes["default"].NOT_NUMBER, property, value);
        if (!checkerSettings.doNotModify) config[property] = converted;
        return converted;
      } else {
        throw new _CheckerError["default"](_CheckerErrorTypes["default"].NOT_NUMBER, property, value);
      }
    }

    return value;
  };
}

function booleanChecker() {
  var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (property, value, config, checkerSettings) {
    if (value === undefined) return;
    var isBoolean = typeof value == "boolean";

    if (!isBoolean) {
      if (settings.convert) {
        if (value === undefined) throw new _CheckerError["default"](_CheckerErrorTypes["default"].NOT_BOOLEAN, property, value);
        var converted = value ? true : false;
        if (!checkerSettings.doNotModify) config[property] = converted;
        return converted;
      } else {
        throw new _CheckerError["default"](_CheckerErrorTypes["default"].NOT_BOOLEAN, property, value);
      }
    }

    return value;
  };
}

function requiredChecker() {
  var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (property, value, config) {
    if (settings.onlyIfAvailableOneOf) {
      if (!Array.isArray(settings.onlyIfAvailableOneOf)) throw new Error("");
      var found = false;

      for (var i = 0, length = settings.onlyIfAvailableOneOf.length; i < length; ++i) {
        if (config[settings.onlyIfAvailableOneOf[i]] !== undefined) {
          found = true;
          break;
        }
      }

      if (!found) return;
    }

    if (settings.onlyIfExactFieldOf) {
      if (!Array.isArray(settings.onlyIfExactFieldOf)) {
        if (_typeof(settings.onlyIfExactFieldOf) !== "object") throw new Error();
        settings.onlyIfExactFieldOf = [settings.onlyIfExactFieldOf];
      }

      var _found;

      for (var _i = 0, _length = settings.onlyIfExactFieldOf.length; _i < _length; ++_i) {
        var keys = Object.keys(settings.onlyIfExactFieldOf[_i]);
        _found = true;

        for (var j = 0, length2 = keys.length; j < length2; ++j) {
          if (config[keys[j]] !== settings.onlyIfExactFieldOf[_i][keys[j]]) {
            _found = false;
            break;
          }
        }
      }

      if (!_found) return;
    }

    if (value === null || value === undefined) throw new _CheckerError["default"](_CheckerErrorTypes["default"].REQUIRED_BUT_MISSING, property, value);
  };
}

function arrayChecker(settings) {
  return function (property, value, config, checkerSettings) {
    if (value === undefined) return;
    if (!Array.isArray(value)) throw new _CheckerError["default"](_CheckerErrorTypes["default"].NOT_ARRAY, property, value);

    if (settings.of) {
      value.forEach(function (child, index) {
        try {
          settings.of._.forEach(function (checker) {
            return checker("".concat(property, "[").concat(index, "]"), child, config, checkerSettings);
          });
        } catch (error) {
          throw new _CheckerError["default"](_CheckerErrorTypes["default"].ARRAY_VALUE_FAILED, property, value, error);
        }
      });
    }
  };
}

function createGenerateOptions(additionalRules) {
  return function generateOptions() {
    var previousChecks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return _objectSpread({
      _: previousChecks,
      string: function string() {
        var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return generateOptions(previousChecks.concat([stringChecker(settings)]));
      },
      integer: function integer() {
        var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return generateOptions(previousChecks.concat([integerChecker(settings)]));
      },
      number: function number() {
        var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return generateOptions(previousChecks.concat([numberChecker(settings)]));
      },
      object: function object() {
        var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return generateOptions(previousChecks.concat([function (property, value, config, checkerSettings) {
          if (value === undefined) return;
          if (_typeof(value) !== "object" || Array.isArray(value)) throw new _CheckerError["default"](_CheckerErrorTypes["default"].NOT_OBJECT, property, value);

          if (settings.valueOfType) {// TODO
          }

          if (settings.shape) {
            Object.keys(settings.shape).forEach(function (subproperty) {
              try {
                settings.shape[subproperty]._.forEach(function (checker) {
                  return checker(subproperty, value[subproperty], value, checkerSettings);
                });
              } catch (error) {
                throw new _CheckerError["default"](error.type, "".concat(property, ".").concat(subproperty), error.value, null, _CheckerErrorTypes["default"].OBJECT_SHAPE_FAILED);
              }
            });
          }
        }]));
      },
      required: function required(settings) {
        return generateOptions(previousChecks.concat([requiredChecker(settings)]));
      },
      array: function array() {
        var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return generateOptions(previousChecks.concat([arrayChecker(settings)]));
      },
      "function": function _function() {
        var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return generateOptions(previousChecks.concat([function (property, value) {
          if (value === undefined) return;
          if (typeof value != "function") throw new _CheckerError["default"](_CheckerErrorTypes["default"].NOT_FUNCTION, property, value); // if (settings.arguments) {
          //     if (!Array.isArray(settings.arguments)) throw new Error(`The property "${property}.arguments" must be an array`);
          //     if (!value.GenezisFunctionArguments) {
          //         console.log(`The function "${property}" doesn't have "GenezisFunctionArguments" so can't check the arguments`, property, value);
          //         return;
          //     }
          //     if (!Array.isArray(value.GenezisFunctionArguments)) throw new CheckerError(`The given function for "${property}.GenezisFunctionArguments" is not an array`, property, value);
          //     if (settings.arguments.length != value.GenezisFunctionArguments.length) throw new CheckerError(`The property "${property}" arguments length are not matching`, property, value);
          //     for (let i=0, length=settings.arguments.length; i < length; ++i) {
          //         if (settings.arguments[i] != value.GenezisFunctionArguments[i]) throw new CheckerError(`The argument number ${i} for property "${property}" doesn't match (${settings.arguments[i]} != ${value.GenezisFunctionArguments[i]})`, property, value);
          //     }
          // }
        }]));
      },
      "boolean": function boolean() {
        var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return generateOptions(previousChecks.concat([booleanChecker(settings)]));
      },
      // GenezisCheckerType: (settings = {}) => generateOptions(previousChecks.concat([(property, value) => {
      //     if (value === undefined) return;
      //     if (typeof value != "function") throw new CheckerError(`The property "${property}" with value "${value}" must be a genezis config type`, property, value);
      // }])),
      instanceOf: function instanceOf(instance) {
        return generateOptions(previousChecks.concat([function (property, value) {
          if (value === undefined) return;
          if (!instance) throw new Error("For option \"instanceOf\" of property \"".concat(property, "\" is missing the instance"));
          if (!(value instanceof instance)) throw new _CheckerError["default"](_CheckerErrorTypes["default"].NOT_INSTANCEOF, property, value);
        }]));
      },
      oneOf: function oneOf(options) {
        return generateOptions(previousChecks.concat([function (property, value) {
          if (!options) throw new _CheckerError["default"]("11", property, value);
          if (value === undefined) return;
          if (!Array.isArray(options)) throw new Error("\"options\" must be an array on property \"".concat(property, "\""));
          if (!options.includes(value)) throw new _CheckerError["default"](_CheckerErrorTypes["default"].NOT_IN_ONEOF, property, value);
        }]));
      },
      or: function or(options) {
        return generateOptions(previousChecks.concat([function (property, value, config, checkerSettings) {
          if (!options) throw new Error("\"options\" must be valid on property \"".concat(property, "\""));
          if (!Array.isArray(options)) throw new Error("\"options\" must be an array on property \"".concat(property, "\""));

          for (var i = 0, length = options.length; i < length; ++i) {
            try {
              options[i]._.forEach(function (checker) {
                return checker(property, value, config, checkerSettings);
              });

              return;
            } catch (CheckerError) {// console.log(CheckerError);
            }
          }

          throw new _CheckerError["default"](_CheckerErrorTypes["default"].OR_NO_VALID_VALUE, property, value);
        }]));
      },
      onlyOneAvailable: function onlyOneAvailable(options) {
        var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return generateOptions(previousChecks.concat([function (property, value, config) {
          if (!options) throw new Error("\"options\" must be valid on property \"".concat(property, "\""));
          if (!Array.isArray(options)) throw new Error("\"options\" must be an array on property \"".concat(property, "\""));
          var countAvailable = 0;
          options.forEach(function (option) {
            if (config[option]) ++countAvailable;
          });
          if (countAvailable > 1) throw new _CheckerError["default"](_CheckerErrorTypes["default"].MORE_THAN_ONE, property, value);
          if (settings.throwOnAllMissing && countAvailable == 0) throw new _CheckerError["default"](_CheckerErrorTypes["default"].ALL_MISSING, property, value);
        }]));
      },
      atLeastOneAvailable: function atLeastOneAvailable(options) {
        var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return generateOptions(previousChecks.concat([function (property, value, config) {
          if (!options) throw new Error("\"options\" must be valid on property \"".concat(property, "\""));
          if (!Array.isArray(options)) throw new Error("\"options\" must be an array on property \"".concat(property, "\""));

          for (var i = 0, length = options.length; i < length; ++i) {
            if (config[options[i]]) return true;
          }

          throw new _CheckerError["default"](_CheckerErrorTypes["default"].NONE_AVAILABLE, "atLeastOneAvailable", options);
        }]));
      },
      any: function any() {
        return generateOptions(previousChecks.concat([function () {}]));
      },
      ignore: function ignore() {
        return generateOptions(previousChecks.concat([function () {}]));
      }
    }, additionalRules ? additionalRules(generateOptions, previousChecks) : {});
  };
}

function createChecker(options) {
  var checker = function checker(config, settings) {
    var checkerSettings = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    if (config == null) throw new Error();
    if (settings == null) throw new Error();

    try {
      Object.keys(settings).forEach(function (property) {
        settings[property]._.forEach(function (checker) {
          return checker(property, config[property], config, checkerSettings);
        });
      });
    } catch (error) {
      if (checkerSettings.globalErrorAdditionalData) {
        error.additionalData = checkerSettings.globalErrorAdditionalData;
      }

      throw error;
    }
  };

  Object.assign(checker, options);
  return checker;
}

function makeConfig(additionalRules) {
  return createChecker(createGenerateOptions(additionalRules)());
}

var GenezisChecker;

if (!global.genezis_checker_nodisableinproduction && process.env.NODE_ENV == "production") {
  GenezisChecker = function GenezisChecker() {};

  Object.assign(GenezisChecker, createGenerateOptions()());
} else {
  GenezisChecker = makeConfig();
}

var _default = GenezisChecker;
exports["default"] = _default;