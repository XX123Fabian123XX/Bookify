const AppError = require("../../controllers/errors/appError");
const bookClass = require("./bookModel");
const apiFeatures = require("../apiFeatures");

const makeDbConnection = (mongoose) =>  {

    const Book = new bookClass(mongoose);
    const getAllBooks = async (query) => {
        const firstQuery = Book.find({});
        const finalQuery = new apiFeatures(firstQuery, query).filter().sort().paginate().limitFields().query

     return (await finalQuery).map(el => el.toObject())
    }
    const getSingleBook = async (id) => {
        const singleBook = (await Book.findOne({id}, {_id:0}))

        if (!singleBook) throw new AppError(`No book was found with the id ${id}`, 404);

        return singleBook.toObject();
    }

    const createBook = async(bookInformation) => {
        const res =  (await new Book(bookInformation).save()).toObject();
        delete res["_id"]
        return res
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