const buildUseCases = require("../../../useCases/books/index");
const dbConnection = require("../../data-access/books/books-db");

const buildDeleteBook = (db) => {
    const useCases = buildUseCases(dbConnection(db));
    return async(req) => {
        const id = req.params.id;

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