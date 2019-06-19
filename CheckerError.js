export default class extends Error {
    constructor(type, property, value) {
        super(`genezis/CheckerError of type ${type} on "${property}":"${value}"`);

        this.name = this.constructor.name;

        this.type = type;
        this.property = property;
        this.value = value;

        Error.captureStackTrace(this, this.constructor);
    }
}