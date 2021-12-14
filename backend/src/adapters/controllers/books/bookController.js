const buildGetAllBooks = require("./getAllBooks");

const buildBookController = (db) => {
    return {
        getAllBooks:buildGetAllBooks(db)
    }
}

module.exports = buildBookController;