const buildUseCases = require("../../../useCases/books/index");
const dbConnection = require("../../data-access/books/books-db");

const buildCreateBook = (db) => {
    const useCases = buildUseCases(dbConnection(db));

    return async(req) => {
        //daten aus dem Body
        
        const newBook = await useCases.createBook(req.body)

        return {
            status:201,
            message:"success",
            body: {
                data: newBook
            }
        }
    }
} 

module.exports = buildCreateBook