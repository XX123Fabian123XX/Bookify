const AppError = require("./appError")


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

    err.statusCode = err.statusCode ?? 500;
    err.status = err.status ?? "error"

    if (process.env.NODE_ENV === "development") sendErrorDevelopment(err, req, res);
    if (err.message === "Please provide a valid id") err = new AppError(err.message, 400)
    if (err.message === "jwt expired") err = new AppError("Your token has expired. Please login again", 401)
    if (err.message === "invalid token") err = new AppError("Your token is invalid. Please login again", 401)
    if (err.code === 11000) err = handleDuplicateKeyError(err);

    sendErrorProduction(err, req, res);
}

