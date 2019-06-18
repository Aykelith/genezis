export default class extends Error {
    constructor(message, property, value, otherData) {
        super(message);

        this.name = this.constructor.name;
        this.property = property;
        this.value = value;
        this.otherData = otherData;

        Error.captureStackTrace(this, this.constructor);
    }
};