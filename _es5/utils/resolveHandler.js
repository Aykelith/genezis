"use strict";

require("core-js/modules/es.array.from");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.string.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("regenerator-runtime/runtime");

var _arguments = arguments;

var _callee = function _callee(variable) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(typeof variable == "function")) {
            _context.next = 4;
            break;
          }

          _context.next = 3;
          return regeneratorRuntime.awrap(variable(Array.from(_arguments).shift()));

        case 3:
          return _context.abrupt("return", _context.sent);

        case 4:
          return _context.abrupt("return", variable);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports["default"] = _callee;