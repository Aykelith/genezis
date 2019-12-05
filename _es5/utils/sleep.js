"use strict";

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/web.timers");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
};

exports["default"] = _default;