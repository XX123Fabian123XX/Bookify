const {makeBook} = require("../../entities/books/index");
const getBookInformation = require("../../utils/getBookInformation");
const makeUpdateBook = (dbConnection) => {
    return async function(id, newBookInformation) {
        const oldBook = dbConnection.getBook(id);

        const newBook = makeBook(...oldBook, ...newBookInformation)

        await dbConnection.updateBook(id, getBookInformation(newBook))
    }
}

module.exports = makeUpdateBook;