const {makeBook} = require("../../entities/books/index");
const getBookInformation = require("../../utils/getBookInformation");
const buildCreateBook = function(dbConnection) {
    return async function(bookInformation) {
        console.log("this is the book information")
        console.log(bookInformation)
        const book = await makeBook({...bookInformation})
        console.log(getBookInformation(book))        
        return await dbConnection.createBook(getBookInformation(book))
    } 
} 

module.exports = buildCreateBook;
