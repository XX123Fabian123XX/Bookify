const buildUseCases = require("../../../useCases/books/index");
const dbConnection = require("../../data-access/books/books-db");

const buildUpdateBook = (db) => {
    const useCases = buildUseCases(dbConnection(db));

    return async(req) => {
        //daten aus dem Body
        req.body.id = req.params.id
       
        if (req.files && req.files.bookCoverImage) req.body.linkBookCoverImage = req.files.bookCoverImage[0].filename;

        if (req.files && req.files.bookBackImage) req.body.linkBookBackImage = req.files.bookBackImage[0].filename

        const updatedBook = await useCases.updateBook(req.params.id, req.body);

        return {
            status:202,
            message:"success",
            body: {
                data: updatedBook
            }
        }
    }
} 

module.exports = buildUpdateBook