export default class extends Error {
  constructor(type, property, value, originalError, additionalData) {
    super(`genezis/CheckerError of type ${type} on "${property}":"${value}"`);
    this.name = this.constructor.name;
    this.type = type;
    this.property = property;
    this.value = value;
    this.originalError = originalError;
    this.additionalData = additionalData;
    Error.captureStackTrace(this, this.constructor);
  }

}