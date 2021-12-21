const buildUseCases = require("../../../useCases/books/index");
const dbConnection = require("../../data-access/books/books-db");
const AppError = require("../errors/appError");

const BuildGetSingleBook = (db) => {
    const useCases = buildUseCases(dbConnection(db));

    return async (req) => {
        if (!req.params.id) throw new AppError("Please provide an id", 400);

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