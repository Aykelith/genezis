let path = require("path");

module.exports = {
	ignore: [ new RegExp(`node_modules${path.sep == "\\" ? "\\\\" : "/"}(?!gsp-react-livesearch/src)(?!@genezis)(?!vrtour-react)`) ],
	"presets": [["@babel/env", { "useBuiltIns": "usage", "corejs": 2 }], "@babel/react"],
	"plugins": [
		["module-resolver", {
      		"root": [
				"./src", 
				"./src/packages", 
				"./src/gitpackages"
			]
		}],
		["@babel/plugin-syntax-object-rest-spread"],
		["@babel/plugin-syntax-dynamic-import"],
		["@babel/plugin-syntax-async-generators"],
		["@babel/plugin-transform-regenerator"],
		["@babel/plugin-proposal-decorators", { "legacy": true }],
		["@babel/plugin-proposal-class-properties", { "loose": true }],
		["module:crm-babel-uniquenumber", {
			"__CRM_UNIQUE_NUMBER": {}
		}]
	]
};
