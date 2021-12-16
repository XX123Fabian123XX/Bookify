class AppError extends Error {
    constructor(message, statusCode) {
        super(message)

        // set the status code
        this.statusCode = statusCode;
        this.isOperational = true;

        this.status = `${this.statusCode}`.startsWith('4') ? 'fail' : "error"

        // keep the stack trace clean
        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = AppError;