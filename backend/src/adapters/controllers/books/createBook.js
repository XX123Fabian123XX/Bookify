const buildUseCases = require("../../../useCases/books/index");
const dbConnection = require("../../data-access/books/books-db");

const buildCreateBook = async(db) => {
    const useCases = buildUseCases(dbConnection(db));

    return async(req) => {
        // daten aus dem Body
        const {title, author, datePublished, numberPages, 
            rating, genre, userReference} = req.body;
        
        const newBook = await useCases.createBook({
            title,
            author,
            datePublished,
            numberPages,
            rating,
            genre,
            userReference
        })

        return {
            status:201,
            message:"success",
            body: {
                book: newBook
            }
        }
    }
} 

module.exports = buildCreateBook