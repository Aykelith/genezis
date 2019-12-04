export default ((rules, defaultKeys) => {
  let separatedRules = {};
  defaultKeys.forEach(key => {
    separatedRules[key] = {};
  });

  if (rules) {
    rules.forEach(rule => {
      rule.on.forEach(on => {
        if (!separatedRules[on]) separatedRules[on] = {};
        Object.assign(separatedRules[on], rule.apply);
      });
    });
  }

  return separatedRules;
});