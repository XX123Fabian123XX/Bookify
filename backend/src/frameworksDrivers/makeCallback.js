const AppError = require("../adapters/controllers/errors/appError")

// basic callback function
const makeCallback = (callback, lastCallback=true) => {
    return async (req,res,next) => {
        try {
            const response = await callback(req,res, next)
            console.log(response)
            if (lastCallback) res.json(response)
        } catch(err) {
            // error object in next
            next(err)
        }
    }
}

module.exports = makeCallback;