const buildGetAllBooks = require("./getAllBooks");
const buildCreateBook = require("./createBook")


const buildBookController = (db) => {
    return {
        getAllBooks:buildGetAllBooks(db),
        createBook:buildCreateBook(db)
    }
}

module.exports = buildBookController;