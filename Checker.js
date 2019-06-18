import ConfigError from "./CheckerError";

export function stringChecker(settings = {}) {
    return (property, value, config, checkerSettings) => {
        if (value === undefined) return;

        const isString = typeof value == "string";
        if (!isString) {
            if (settings.convert) {
                let converted = Number.parseInt(value);

                if (Number.isNaN(converted)) throw new ConfigError(`The property "${property}" with value "${value}" must be a string`, property, value);
                if (!checkerSettings.doNotModify) config[property] = converted;

                return converted;
            } else {
                throw new ConfigError(`The property "${property}" with value "${value}" must be a string`, property, value);
            }
        }

        return value;
    };
}

export function integerChecker(settings = {}) {
    return (property, value, config, checkerSettings) => {
        if (value === undefined) return;

        const isInteger = Number.isInteger(value);
        if (!isInteger) {
            if (settings.convert) {
                let converted = Number.parseInt(value);

                if (Number.isNaN(converted)) throw new ConfigError(`The property "${property}" with value "${value}" must be a number`, property, value);
                if (!checkerSettings.doNotModify) config[property] = converted;

                return converted;
            } else {
                throw new ConfigError(`The property "${property}" with value "${value}" must be an integer`, property, value);
            }
        }

        return value;
    };
}

export function booleanChecker(settings = {}) {
    return (property, value, config, checkerSettings) => {
        if (value === undefined) return;
        
        const isBoolean = typeof value == "boolean";

        if (!isBoolean) {
            if (settings.convert) {
                if (value === undefined) throw new ConfigError("", property, value);

                const converted = value ? true : false;
                if (!checkerSettings.doNotModify) config[property] = converted;

                return converted;
            } else {
                throw new ConfigError(`The property "${property}" with value "${value}" must be a boolean`, property, value);
            }
        }

        return value;
    };
}

export function defaultChecker(defaultValue) {
    return (property, value, config, checkerSettings) => {
        if (value === undefined) {
            if (!checkerSettings.doNotModify) config[property] = defaultValue;
            return defaultValue;
        }

        return undefined;
    }
}

export function requiredChecker(settings = {}) {
    return (property, value, config) => {
        if (settings.onlyIfAvailableOneOf) {
            let found = false;
            for (let i=0, length=settings.onlyIfAvailableOneOf.length; i < length; ++i) {
                if (config[settings.onlyIfAvailableOneOf[i]] !== undefined) {
                    found = true;
                    break;
                }
            }

            if (!found) return;
        }

        if (value === null || value === undefined) throw new ConfigError(`The property "${property}" is missing but is marked as required`, property, value);
    };
}

export function arrayChecker(settings) {
    return (property, value, config, checkerSettings) => {
        if (value === undefined) return;
        if (!Array.isArray(value)) throw new ConfigError(`The property "${property}" with value "${value}" must be an array`, property, value);
    
        if (settings.of) {
            value.forEach((child, index) => {
                settings.of._[0](`${property}[${index}]`, child, config, checkerSettings);
            });
        }
    };
}

export function createGenerateOptions(additionalRules) {
    return function generateOptions(previousChecks = []) {
        return {
            _: previousChecks,
            string: (settings = {}) => generateOptions(previousChecks.concat([stringChecker(settings)])),
            integer: (settings = {}) => generateOptions(previousChecks.concat([integerChecker(settings)])),
            object: (settings = {}) => generateOptions(previousChecks.concat([(property, value, config, checkerSettings) => {
                if (value === undefined) return;
                if (typeof value !== "object" || Array.isArray(value)) throw new ConfigError(`The property "${property}" with value "${value}" must be an object`, property, value);
    
                if (settings.valueOfType) {
                    // TODO
                }

                if (settings.shape) {
                    Object.keys(settings.shape).forEach(subproperty => {
                        settings.shape[subproperty]._.forEach(checker => checker(subproperty, value[subproperty], value, checkerSettings));
                    })
                }
            }])),
            required: (settings) => generateOptions(previousChecks.concat([requiredChecker(settings)])),
            array: (settings = {}) => generateOptions(previousChecks.concat([arrayChecker(settings)])),
            function: (settings = {}) => generateOptions(previousChecks.concat([(property, value) => {  
                if (value === undefined) return;
                if (typeof value != "function") throw new ConfigError(`The property "${property}" must be an function`, property, value);
    
                if (settings.arguments) {
                    if (!Array.isArray(settings.arguments)) throw new ConfigError(`The property "${property}.arguments" must be an array`, property, value);
    
                    if (!value.GenezisFunctionArguments) {
                        console.log(`The function "${property}" doesn't have "GenezisFunctionArguments" so can't check the arguments`, property, value);
                        return;
                    }
    
                    if (!Array.isArray(value.GenezisFunctionArguments)) throw new ConfigError(`The given function for "${property}.GenezisFunctionArguments" is not an array`, property, value);
    
                    if (settings.arguments.length != value.GenezisFunctionArguments.length) throw new ConfigError(`The property "${property}" arguments length are not matching`, property, value);
                    for (let i=0, length=settings.arguments.length; i < length; ++i) {
                        if (settings.arguments[i] != value.GenezisFunctionArguments[i]) throw new ConfigError(`The argument number ${i} for property "${property}" doesn't match (${settings.arguments[i]} != ${value.GenezisFunctionArguments[i]})`, property, value);
                    }
                }
            }])),
            boolean: (settings = {}) => generateOptions(previousChecks.concat([booleanChecker(settings)])),
            genezisConfigType: (settings = {}) => generateOptions(previousChecks.concat([(property, value) => {
                if (value === undefined) return;
                if (typeof value != "function") throw new ConfigError(`The property "${property}" with value "${value}" must be a genezis config type`, property, value);
            }])),
            default: (defaultValue) => generateOptions(previousChecks.concat([defaultChecker(defaultValue)])),
            instanceOf: (instance) => generateOptions(previousChecks.concat([(property, value) => {
                if (value === undefined) return;
                if (!(value instanceof instance)) throw new ConfigError("13", property, value);
            }])),
            oneOf: (options) => generateOptions(previousChecks.concat([(property, value) => {
                if (!options) throw new ConfigError("11", property, value);
                if (value === undefined) return;
                if (!Array.isArray(options)) throw new ConfigError("", property, value);

                if (!options.includes(value)) throw new ConfigError("", property, value);
            }])),
            or: (options) => generateOptions(previousChecks.concat([(property, value, config, checkerSettings) => {
                if (!options) throw new ConfigError("12", property, value);
                if (!Array.isArray(options)) throw new ConfigError("", property, value);

                for (let i=0, length = options.length; i < length; ++i) {
                    try {
                        options[i]._.forEach(checker => checker(property, value, config, checkerSettings));
                        return;
                    } catch (ConfigError) {
                        // console.log(ConfigError);
                    }
                }

                throw new ConfigError("", property, value);
            }])),
            any: (options) => generateOptions(previousChecks.concat([() => {}])),
            onlyOneAvailable: (options, settings = {}) => generateOptions(previousChecks.concat([(property, value, config) => {
                if (!options) throw new ConfigError("15", property, value);
                if (!settings) throw new ConfigError("16", property, value);
                if (!Array.isArray(options)) throw new ConfigError("17", property, value);

                let countAvailable = 0;
                options.forEach(option => {
                    if (config[option]) ++countAvailable;
                });

                if (countAvailable > 1) throw new ConfigError("18", property, value);
                if (settings.throwOnAllMissing && countAvailable == 0) throw new ConfigError("19", property, value);
            }])),
            ignore: () => generateOptions(previousChecks.concat([() => {}])),
            ...additionalRules(generateOptions, previousChecks)
        }
    }
}

export function createChecker(options) {
    let checker = (config, settings, checkerSettings = {}) => {
        if (!config) throw new Error();
        if (!settings) throw new Error();

        Object.keys(settings).forEach(property => {
            settings[property]._.forEach(checker => checker(property, config[property], config, checkerSettings));
        });
    }

    Object.assign(checker, options);

    return checker;
}

export function makeConfig(additionalRules) {
    return createChecker(createGenerateOptions(additionalRules)());
}   

let GenezisConfig = makeConfig((generateOptions, previousChecks) => { return {
    rules: (settings = {}) => generateOptions(previousChecks.concat([(property, value) => {
        if (value === undefined) return;
        if (!Array.isArray(value)) throw new ConfigError(`The property "${property}" with value "${value}" must be an array`, property, value);

        for (let i=0, length=value.length; i < length; ++i) {
            if (!value[i].on) throw new ConfigError(`The property "on" at index ${i} of "${property}" is missing`, property, value);
            if (!Array.isArray(value[i].on)) throw new ConfigError(`The property "on" at index ${i} of "${property}" must be an array`, property, value);
            if (!value[i].apply) throw new ConfigError(`The property "apply" at index ${i} of "${property}" is missing`, property, value);
        }

        if (settings.onlyOn) {
            if (!Array.isArray(settings.onlyOn)) throw new ConfigError(`The property "onlyOn" of "${property}" must be an array`, property, value);

            for (let i=0, length=value.length; i < length; ++i) {
                for (let j=0, length2=value[i].on.length; j < length2; ++j) {
                    if (!settings.onlyOn.includes(value[i].on[j])) throw new ConfigError("20", property, value);
                }
            }
        }

        if (settings.rulesPossible) {

        }

        if (settings.rulesPossibleOnlyOn) {

        }
    }]))
}});

GenezisConfig.FunctionArguments = {
    RouterRequestObject: 0
};

export default GenezisConfig;