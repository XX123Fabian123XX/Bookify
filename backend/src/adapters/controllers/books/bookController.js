const buildGetAllBooks = require("./getAllBooks");
const buildCreateBook = require("./createBook");
const BuildGetSingleBook = require("./getSingleBook");
const buildDeleteBook = require("./deleteBook");
const buildUpdateBook = require("./updateBook");
const buildGetMyBooks = require("./getMyBooks");

const buildBookController = (db) => {
    return {
        getAllBooks:buildGetAllBooks(db),
        createBook:buildCreateBook(db),
        getSingleBook:BuildGetSingleBook(db),
        deleteBook: buildDeleteBook(db),
        updateBook: buildUpdateBook(db),
        getMyBooks: buildGetMyBooks(db)
    }
}

module.exports = buildBookController;