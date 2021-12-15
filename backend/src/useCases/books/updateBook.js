const {makeBook} = require("../../entities/books/index");
const getBookInformation = require("../../utils/getBookInformation");
const makeUpdateBook = (dbConnection) => {
    return async function(id, newBookInformation) {
        const oldBook = await dbConnection.getSingleBook(id);

        const newBook = await makeBook({...oldBook, ...newBookInformation})

        return await dbConnection.updateBook(id, getBookInformation(newBook))
    }
}

module.exports = makeUpdateBook;