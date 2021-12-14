const makeDbConnection = (mongoose) =>  {
    const bookSchema =  new mongoose.Schema({
        id:{
            type:String,
            required:true,
            unique:true
        },
        title: {
            type:String,
            required:true,
        },
        author: {
            type:String,
            required:true
        },
        datePublished: {
            type:Date,
            required:true
        },
        linkBookCover: {
            type:String,
            unique:true
        },
        linkBookBack: {
            type:String,
            unique:true
        },
        numberPages: {
            type:Number,
            required:true
        },
        rating: {
            type:Number
        },
        genre: {
            type:String,
        },
        createdAt: {
            type:Date,
            default: new Date,
        },
        userReference: {
            type:String,
        }        
    })

    const Book = mongoose.model("Book",bookSchema)

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