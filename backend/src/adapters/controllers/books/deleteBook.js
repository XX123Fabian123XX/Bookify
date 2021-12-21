const buildUseCases = require("../../../useCases/books/index");
const dbConnection = require("../../data-access/books/books-db");
const deleteFileFromUploads = require("../utils/deleteUploads");

const buildDeleteBook = (db) => {
    const useCases = buildUseCases(dbConnection(db));
    return async(req) => {
        const id = req.params.id;

        const book = await useCases.getSingleBook(id);

        if (book.linkBookCoverImage) deleteFileFromUploads(book.linkBookCoverImage);

        if (book.linkBookBackImage) deleteFileFromUploads(book.linkBookBackImage);


        await useCases.deleteBook(id);

        return {
            status:204,
            message:"success",
            body: {
                data:null
            }
        }
       
    } 
}

module.exports = buildDeleteBook;