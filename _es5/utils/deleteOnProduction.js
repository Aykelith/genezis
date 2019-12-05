"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(data) {
  if (process.env.NODE_ENV == "production") return;
  return data;
};

exports["default"] = _default;