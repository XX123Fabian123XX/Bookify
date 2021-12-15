const buildUseCases = require("../../../useCases/books/index");
const dbConnection = require("../../data-access/books/books-db");

const BuildGetSingleBook = (db) => {
    const useCases = buildUseCases(dbConnection(db));

    return async (req) => {
        const id = req.params.id;
        const book = await useCases.getSingleBook(id);

        return {
            status:200,
            message:"success",
            body: {
                data:book
            }
        }

    }
}

module.exports = BuildGetSingleBook;