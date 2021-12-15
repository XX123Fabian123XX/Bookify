const buildGetAllBooks = require("./getAllBooks");
const buildCreateBook = require("./createBook");
const BuildGetSingleBook = require("./getSingleBook");


const buildBookController = (db) => {
    return {
        getAllBooks:buildGetAllBooks(db),
        createBook:buildCreateBook(db),
        getSingleBook:BuildGetSingleBook(db)
    }
}

module.exports = buildBookController;