const buildUseCases = require("../../../useCases/books/index");
const dbConnection = require("../../data-access/books/books-db");

const buildGetMyBooks = (mongoose) => {
    const useCases = buildUseCases(dbConnection(mongoose));
    return async(req) => {
        const books = await useCases.getAllBooks({query:{userReference:req.user._id}});

        console.log(books);

        return {
            status:200,
            message:"success",
            body: {
                length: books.length,
                data: books,
            }
        }

    }
}

module.exports = buildGetMyBooks;