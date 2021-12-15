const buildGetAllBooks = require("./getAllBooks");
const buildCreateBook = require("./createBook");
const BuildGetSingleBook = require("./getSingleBook");
const buildDeleteBook = require("../../../useCases/books/deleteBook");


const buildBookController = (db) => {
    return {
        getAllBooks:buildGetAllBooks(db),
        createBook:buildCreateBook(db),
        getSingleBook:BuildGetSingleBook(db),
        deleteBook: buildDeleteBook(db)
    }
}

module.exports = buildBookController;