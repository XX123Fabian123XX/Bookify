const buildUseCases = require("../../../useCases/books/index");
const dbConnection = require("../../data-access/books/books-db");

const buildGetAllBooks = (db) => {
    const useCases = buildUseCases(dbConnection(db));

    return async(req) => {
        
        const allBooks = await useCases.getAllBooks(req);
        return {
            statusCode:200,
            message:"success",
            body:{
                length:allBooks.length,
                data: allBooks
            }
        }
        
    }
}

module.exports = buildGetAllBooks;