const {makeBook} = require("../../entities/books/index")
exports.makeUpdateBook = (dbConnection) => {
    return async function(id, newBookInformation) {
        const oldBook = dbConnection.getBook(id);

        const newBookInformation = makeBook(...oldBook, ...newBookInformation)

        await dbConnection.updateBook(id, {
            title: newBookInformation.getTitle(),
            author:newBookInformation.getAuthor(),
            datePublished: newBookInformation.getDatePublished(),
            linkBookCover: newBookInformation.getLinkBookCover(),
            linkBookBack: newBookInformation.getLinkBookBack(),
            numberPages: newBookInformation.getNumberPages(),
            rating: newBookInformation.getRating(),
            genre: newBookInformation.getGenre(),
            userReference: newBookInformation.genre(),
            createdAt: newBookInformation.createdAt()
        })
    }
}