const AppError = require("./appError")
const BaseError = require("../../../utils/baseError")


// TODO: IMPROVE CAST ERROR

const handleCastError = (err) => {
    return new AppError(`Invalid data for field ${err.path} with the value ${err.value}`, 400);
}

const handleValidationError = (err) => {
   
    let match = (err.message.match(/:.*:/));
    const field = match[0].replace(/:/g, "").trim()
    
    match = err.message.match(/Cast to \w+/);
    const datatype = match[0].split(" ").at(-1)
    
    match = err.message.match(/value.+?\s/);
    const value = match[0].split('"')[1]

    return new AppError(`Cast Error for the field ${field} with the value ${value}. Expected datatype ${datatype} `, 400);
}

const handleDuplicateKeyError = (err) => {
    const duplicatedValue = err.message.match(/(?<=\{).*(?=\})/)[0].trim()
    let errorMessage = `Duplicate key error for {${duplicatedValue}}`
    errorMessage = errorMessage.replace(/"+/g, '')
    return new AppError(errorMessage, 400)
}

const sendErrorProduction = (err, req ,res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status:err.status,
            message:err.message
        })
    }

    console.error(err)
    // send generic error message
    res.status(err.statusCode).json({
        status: err.status,
        message:"Something went wrong, please try again later!"
    })
}

const sendErrorDevelopment = (err, req, res) => {
    res.status(err.statusCode).json({
        status:err.status,
        error:err,
        message:err.message,
        stacktrace: err.stack
    
    })
}

module.exports = (err, req,res,next) => {

    if (err instanceof BaseError) {
        err = new AppError(err.message, 400);
    }

    err.statusCode = err.statusCode ?? 500;
    err.status = err.status ?? "error"
    
    if (err.message === "jwt expired") err = new AppError("Your token has expired. Please login again", 401)
    if (err.name === "JsonWebTokenError") err = new AppError("Your token is invalid. Please login again", 401)
    if (err.code === 11000) err = handleDuplicateKeyError(err);
    if (err.name === "ValidationError") err = handleValidationError(err)
    if (err.name ===  "CastError") err = handleCastError(err)

    if (process.env.NODE_ENV === "development") sendErrorDevelopment(err, req, res);

    sendErrorProduction(err, req, res);
}