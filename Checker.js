import CheckerError from "./CheckerError";
import CheckerErrorTypes from "./CheckerErrorTypes";

export function stringChecker(settings = {}) {
    return (property, value, config, checkerSettings) => {
        if (value === undefined) return;

        const isString = typeof value == "string";
        if (!isString) {
            if (settings.convert) {
                let converted = Number.parseInt(value);

                if (Number.isNaN(converted)) throw new CheckerError(CheckerErrorTypes.NOT_STRING, property, value);
                if (!checkerSettings.doNotModify) config[property] = converted;

                return converted;
            } else {
                throw new CheckerError(CheckerErrorTypes.NOT_STRING, property, value);
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

                if (Number.isNaN(converted)) throw new CheckerError(CheckerErrorTypes.NOT_INTEGER, property, value);
                if (!checkerSettings.doNotModify) config[property] = converted;

                return converted;
            } else {
                throw new CheckerError(CheckerErrorTypes.NOT_INTEGER, property, value);
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
                if (value === undefined) throw new CheckerError(CheckerErrorTypes.NOT_BOOLEAN, property, value);

                const converted = value ? true : false;
                if (!checkerSettings.doNotModify) config[property] = converted;

                return converted;
            } else {
                throw new CheckerError(CheckerErrorTypes.NOT_BOOLEAN, property, value);
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
    };
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

        if (value === null || value === undefined) throw new CheckerError(CheckerErrorTypes.REQUIRED_BUT_MISSING, property, value);
    };
}

export function arrayChecker(settings) {
    return (property, value, config, checkerSettings) => {
        if (value === undefined) return;
        if (!Array.isArray(value)) throw new CheckerError(CheckerErrorTypes.NOT_ARRAY, property, value);
    
        if (settings.of) {
            value.forEach((child, index) => {
                try {
                    settings.of._.forEach(checker => checker(`${property}[${index}]`, child, config, checkerSettings));
                } catch (error) {
                    throw new CheckerError(CheckerErrorTypes.ARRAY_VALUE_FAILED, property, value, error);
                }
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
                if (typeof value !== "object" || Array.isArray(value)) throw new CheckerError(CheckerErrorTypes.NOT_OBJECT, property, value);
    
                if (settings.valueOfType) {
                    // TODO
                }

                if (settings.shape) {
                    Object.keys(settings.shape).forEach(subproperty => {
                        try {
                            settings.shape[subproperty]._.forEach(checker => checker(subproperty, value[subproperty], value, checkerSettings));
                        } catch (error) {
                            throw new CheckerError(CheckerErrorTypes.OBJECT_SHAPE_FAILED, property, value, error);
                        }
                    });
                }
            }])),
            required: (settings) => generateOptions(previousChecks.concat([requiredChecker(settings)])),
            array: (settings = {}) => generateOptions(previousChecks.concat([arrayChecker(settings)])),
            function: (settings = {}) => generateOptions(previousChecks.concat([(property, value) => {  
                if (value === undefined) return;
                if (typeof value != "function") throw new CheckerError(CheckerErrorTypes.NOT_FUNCTION, property, value);
    
                // if (settings.arguments) {
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
            }])),
            boolean: (settings = {}) => generateOptions(previousChecks.concat([booleanChecker(settings)])),
            // GenezisCheckerType: (settings = {}) => generateOptions(previousChecks.concat([(property, value) => {
            //     if (value === undefined) return;
            //     if (typeof value != "function") throw new CheckerError(`The property "${property}" with value "${value}" must be a genezis config type`, property, value);
            // }])),
            default: (defaultValue) => generateOptions(previousChecks.concat([defaultChecker(defaultValue)])),
            instanceOf: (instance) => generateOptions(previousChecks.concat([(property, value) => {
                if (value === undefined) return;
                if (!(value instanceof instance)) throw new CheckerError(CheckerErrorTypes.NOT_INSTANCEOF, property, value);
            }])),
            oneOf: (options) => generateOptions(previousChecks.concat([(property, value) => {
                if (!options) throw new CheckerError("11", property, value);
                if (value === undefined) return;
                if (!Array.isArray(options)) throw new Error(`"options" must be an array on property "${property}"`);

                if (!options.includes(value)) throw new CheckerError(CheckerErrorTypes.NOT_IN_ONEOF, property, value);
            }])),
            or: (options) => generateOptions(previousChecks.concat([(property, value, config, checkerSettings) => {
                if (!options) throw new Error(`"options" must be valid on property "${property}"`);
                if (!Array.isArray(options)) throw new Error(`"options" must be an array on property "${property}"`);

                for (let i=0, length = options.length; i < length; ++i) {
                    try {
                        options[i]._.forEach(checker => checker(property, value, config, checkerSettings));
                        return;
                    } catch (CheckerError) {
                        // console.log(CheckerError);
                    }
                }

                throw new CheckerError(CheckerErrorTypes.OR_NO_VALID_VALUE, property, value);
            }])),
            
            onlyOneAvailable: (options, settings = {}) => generateOptions(previousChecks.concat([(property, value, config) => {
                if (!options) throw new Error(`"options" must be valid on property "${property}"`);
                if (!Array.isArray(options)) throw new Error(`"options" must be an array on property "${property}"`);

                let countAvailable = 0;
                options.forEach(option => {
                    if (config[option]) ++countAvailable;
                });

                if (countAvailable > 1) throw new CheckerError(CheckerErrorTypes.MORE_THAN_ONE, property, value);
                if (settings.throwOnAllMissing && countAvailable == 0) throw new CheckerError(CheckerErrorTypes.ALL_MISSING, property, value);
            }])),
            atLeastOneAvailable: (options, settings = {}) => generateOptions(previousChecks.concat([(property, value, config) => {
                if (!options) throw new Error(`"options" must be valid on property "${property}"`);
                if (!Array.isArray(options)) throw new Error(`"options" must be an array on property "${property}"`);
                
                for (let i=0, length=options.length; i < length; ++i) {
                    if (config[options[i]]) return true;
                }

                throw new CheckerError(CheckerErrorTypes.NONE_AVAILABLE, "atLeastOneAvailable", options);
            }])),

            any: () => generateOptions(previousChecks.concat([() => {}])),
            ignore: () => generateOptions(previousChecks.concat([() => {}])),

            ...(additionalRules ? additionalRules(generateOptions, previousChecks) : {})
        };
    };
}

export function createChecker(options) {
    let checker = (config, settings, checkerSettings = {}) => {
        if (!config) throw new Error();
        if (!settings) throw new Error();

        Object.keys(settings).forEach(property => {
            settings[property]._.forEach(checker => checker(property, config[property], config, checkerSettings));
        });
    };

    Object.assign(checker, options);

    return checker;
}

export function makeConfig(additionalRules) {
    return createChecker(createGenerateOptions(additionalRules)());
}

let GenezisChecker;
if (!global.genezis_checker_nodisableinproduction && process.env.NODE_ENV == "production") {
    GenezisChecker = function () {};
    Object.assign(GenezisChecker, createGenerateOptions()());
} else {
    GenezisChecker = makeConfig();
}

export default  GenezisChecker;