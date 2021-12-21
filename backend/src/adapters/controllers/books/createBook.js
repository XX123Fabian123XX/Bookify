const buildUseCases = require("../../../useCases/books/index");
const dbConnection = require("../../data-access/books/books-db");
const AppError = require("../errors/appError");

const buildCreateBook = (db) => {
    const useCases = buildUseCases(dbConnection(db));

    return async(req) => {

        if (!req.body.numberPages) throw new AppError("Please provide the number of pages of the book", 400);
        if (!req.body.datePublished) throw new AppError("Please provide a publishing date", 400);
        if (!req.body.author) throw new AppError("Please provide an author", 400);
        if (!req.body.title) throw new AppError("Please provide a title", 400);
        
        req.body.userReference = req.user._id;

        req.body.id = db.Types.ObjectId()

        if (req.files && req.files.bookCoverImage) req.body.linkBookCoverImage = req.files.bookCoverImage[0].filename;

        if (req.files && req.files.bookBackImage) req.body.linkBookBackImage = req.files.bookBackImage[0].filename

        const newBook = await useCases.createBook(req.body)

        return {
            status:201,
            message:"success",
            body: {
                data: newBook
            }
        }
    }
} 

module.exports = buildCreateBook