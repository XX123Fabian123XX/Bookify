const buildUseCases = require("../../../useCases/books/index");
const dbConnection = require("../../data-access/books/books-db");

const buildCreateBook = (db) => {
    const useCases = buildUseCases(dbConnection(db));

    return async(req) => {
        //daten aus dem Body
        const userReference = req.user._id

        req.body.userReference = userReference

        req.body.id = db.Types.ObjectId()

        req.body.linkBookCoverImage = req.files.bookCoverImage[0].filename
        req.body.linkBookBackImage = req.files.bookBackImage[0].filename 

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