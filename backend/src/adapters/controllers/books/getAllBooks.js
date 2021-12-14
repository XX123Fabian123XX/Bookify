const buildUseCases = require("../../../useCases/books/index");
const dbConnection = require("../../data-access/books/books-db");

const buildGetAllBooks = (db) => {
    const useCases = buildUseCases(dbConnection(db));

    return async() => {
        
        const allBooks = await useCases.getAllBooks();
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