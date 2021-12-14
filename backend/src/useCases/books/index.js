const buildDeleteBook = require("./deleteBook");
const buildCreateBook =require("./createBook")
const buildGetAllBooks = require("./getAllBooks");
const buildGetBook = require("./getBook")
const buildUpdateBook = require("./updateBook");

const buildUseCases = function(dbConnection) {
    return {
        deleteBook: buildDeleteBook(dbConnection),
        createBook: buildCreateBook(dbConnection),
        getAllBooks: buildGetAllBooks(dbConnection),
        getSingleBook: buildGetBook(dbConnection),
        updateBook: buildUpdateBook(dbConnection)
    }
}

module.exports = buildUseCases;