const dbBookConnection = require("../../data-access/books/books-db");
const AppError = require("../errors/appError");

const buildUserCreatedBookMiddleware = (mongooseObject) => {
    const dbConnection = dbBookConnection(mongooseObject);

    return async (req,res,next) => {
        const book = await dbConnection.getSingleBook(req.params.id);
        if (`${req.user._id}` !== `${book.userReference._id}`) {
            throw new AppError("You have not created this book. Therefore you cannot change it", 403)
        }
        next();    
    }
}

module.exports = buildUserCreatedBookMiddleware;