module.exports = class CustomException {
    constructor(message = null, statusCode = null) {
        this.message = message;
        this.statusCode = statusCode;
    }
}