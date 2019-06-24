# CHANGELOG

## 21.06.2019

- deleted the `default` rule because can't be applied on production and can be misleading;
- added `utils/deleteOnProduction` that return `undefined` instead of the first argv in production;
- added rule `number`;

## 19.06.2019

- changed `CheckerError` to throw a 'type' of error instead of an message and now have a general error message;
- created `CheckerErrorTypes.js` which contains all the types of error thrown by `Checker`;
- created a benchmark in `benchmark/index.js` to test the checker versus a classical way of testing parameters;
- in production(`NODE_ENV=production`) the `Checker` will be disabled unless the global `genezis_checker_nodisableinproduction` is set to `true`;
- added `checker` option for the rule `string`;
- now throws error if `instance` is not given to the rule `instanceof`;
