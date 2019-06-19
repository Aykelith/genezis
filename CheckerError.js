export default class extends Error {
    constructor(type, property, value, originalError) {
        super(`genezis/CheckerError of type ${type} on "${property}":"${value}"`);

        this.name = this.constructor.name;

        this.type = type;
        this.property = property;
        this.value = value;
        this.originalError = originalError;

        Error.captureStackTrace(this, this.constructor);
    }
}