const getBookInformation = (book) => {
    return {
        id:book.getId(),
        title:book.getTitle(),
        author:book.getAuthor(),
        datePublished:book.getDatePublished(),
        numberPages:book.getNumberPages(),
        userReference:book.getUserReference(),
        linkBookCover:book.getLinkBookCover(),
        linkBookBack:book.getLinkBookBack(),
        rating:book.getRating(),
        genre: book.getGenre(),
        createdAt: book.getCreatedAt()
    }
}

module.exports = getBookInformation;