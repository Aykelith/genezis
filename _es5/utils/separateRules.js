"use strict";

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.object.assign");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(rules, defaultKeys) {
  var separatedRules = {};
  defaultKeys.forEach(function (key) {
    separatedRules[key] = {};
  });

  if (rules) {
    rules.forEach(function (rule) {
      rule.on.forEach(function (on) {
        if (!separatedRules[on]) separatedRules[on] = {};
        Object.assign(separatedRules[on], rule.apply);
      });
    });
  }

  return separatedRules;
};

exports["default"] = _default;