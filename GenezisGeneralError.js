export default class extends Error {
    constructor(data, originalError, customMessage) {
        super(customMessage || `genezis/GeneralError thrown`);

        this.name = this.constructor.name;

        this.data = data;
        this.originalError = originalError;

        Error.captureStackTrace(this, this.constructor);
    }
}