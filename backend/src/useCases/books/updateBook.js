const {makeBook} = require("../../entities/books/index");
const getBookInformation = require("../../utils/getBookInformation");
const makeUpdateBook = (dbConnection) => {
    return async function(id, newBookInformation) {

        const oldBook = await dbConnection.getSingleBook(id);

        if (!oldBook) throw new Error("A book with this id does not exist")
        
        console.log("this is the new book information")
        console.log(newBookInformation)

        const newBook = await makeBook({...oldBook, ...newBookInformation, id})
        console.log("new book")
        console.log(getBookInformation(newBook))

        return await dbConnection.updateBook(id, getBookInformation(newBook))
    }
}

module.exports = makeUpdateBook;