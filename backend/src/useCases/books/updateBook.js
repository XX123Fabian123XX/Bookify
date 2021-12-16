const {makeBook} = require("../../entities/books/index");
const getBookInformation = require("../../utils/getBookInformation");
const makeUpdateBook = (dbConnection) => {
    return async function(id, newBookInformation) {

        // TODO: WHAT IF THE ID IS WRONG

        const oldBook = await dbConnection.getSingleBook(id);

        if (!oldBook) throw new Error("A book with this id does not exist")


        const newBook = await makeBook({...oldBook, ...newBookInformation})
        return await dbConnection.updateBook(id, getBookInformation(newBook))
    }
}

module.exports = makeUpdateBook;