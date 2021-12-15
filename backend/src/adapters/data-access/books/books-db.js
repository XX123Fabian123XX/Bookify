const bookClass = require("./bookModel");

const makeDbConnection = (mongoose) =>  {

    const Book = new bookClass(mongoose);

    const getAllBooks = async () => {
     return (await Book.find({})).map(el => el.toObject())
    }
    const getSingleBook = async (id) => {
        const singleBook = (await Book.findOne({id}))

        if (!singleBook) return null;

        return singleBook.toObject();
    }

    const createBook = async(bookInformation) => {
        return (await new Book(bookInformation).save()).toObject();
    }

    const updateBook = async(id,bookInformation) => {
        return (await Book.findOneAndUpdate({id}, bookInformation, {new: true})).toObject()
    }

    const deleteBook = async(id) => await Book.deleteOne({id})

    return {
        getAllBooks,
        getSingleBook,
        createBook,
        updateBook,
        deleteBook
    }
}

module.exports = makeDbConnection