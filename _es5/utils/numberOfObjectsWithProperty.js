"use strict";

require("core-js/modules/es.array.for-each");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/**
 * @description Count how many times an object has a property in an array
 * @exports default
 * 
 * @param {*} array 
 * @param {*} property 
 * @param {*} value 
 */
var _default = function _default(array, property, value) {
  var numberOfObjects = 0;
  array.forEach(function (data) {
    if (data[property]) {
      if (value === undefined || data[property] === value) {
        ++numberOfObjects;
      }
    }
  });
  return numberOfObjects;
};

exports["default"] = _default;