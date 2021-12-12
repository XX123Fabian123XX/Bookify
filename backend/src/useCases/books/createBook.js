const {makeBook} = require("../../entities/books/index")

exports.buildCreateBook = function(dbConnection) {
    return async function(bookInformation) {
        const book = await makeBook(...bookInformation)

        await dbConnection.createBook({
            title: book.getTitle(),
            author: book.getAuthor(),
            datePublished: book.getDatePublished(),
            linkBookCover:book.getLinkBookCover(),
            linkBookBack:book.getLinkBookBack(),
            numberPages: book.getNumberPages(),
            rating: book.getRating(),
            genre: book.getGenre(),
            userReference: book.getUserReference(),
            createdAt: book.getCreatedAt()
        })
    } 
} 
