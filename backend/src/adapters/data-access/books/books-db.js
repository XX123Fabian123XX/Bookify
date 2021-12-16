const AppError = require("../../controllers/errors/appError");
const bookClass = require("./bookModel");

const makeDbConnection = (mongoose) =>  {

    const Book = new bookClass(mongoose);

    const getAllBooks = async () => {
     return (await Book.find({}, {_id:0})).map(el => el.toObject())
    }
    const getSingleBook = async (id) => {
        const singleBook = (await Book.findOne({id}, {_id:0}))

        if (!singleBook) throw new AppError(`No book was found with the id ${id}`, 404);

        return singleBook.toObject();
    }

    const createBook = async(bookInformation) => {
        return (await new Book(bookInformation).save()).toObject();
    }

    const updateBook = async(id,bookInformation) => {
        return (await Book.findOneAndUpdate({id}, bookInformation, {new: true, fields:{_id:0}})).toObject()
    }

    const deleteBook = async(id) => {
        const res = await Book.deleteOne({id})
        if (res.deletedCount == 0) throw new AppError(`No book was found with the id ${id}`, 404)    
    }
    return {
        getAllBooks,
        getSingleBook,
        createBook,
        updateBook,
        deleteBook
    }
}

module.exports = makeDbConnection