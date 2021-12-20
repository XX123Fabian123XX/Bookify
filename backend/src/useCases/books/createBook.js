const {makeBook} = require("../../entities/books/index");
const getBookInformation = require("../../utils/getBookInformation");
const buildCreateBook = function(dbConnection) {
    return async function(bookInformation) {
        const book = await makeBook({...bookInformation})
        return await dbConnection.createBook(getBookInformation(book))
    } 
} 

module.exports = buildCreateBook;
