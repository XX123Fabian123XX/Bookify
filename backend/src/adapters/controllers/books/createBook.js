const buildUseCases = require("../../../useCases/books/index");
const dbConnection = require("../../data-access/books/books-db");

const buildCreateBook = (db) => {
    const useCases = buildUseCases(dbConnection(db));

    return async(req) => {
        req.body.userReference = req.user._id;

        req.body.id = db.Types.ObjectId()

        // TODO: research nullish operator to improve if statements
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