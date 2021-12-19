const BaseError = require("../../utils/baseError")
// business logic for the books
exports.buildMakeBook = function(dateValid, ID) {
    return async function({
        id=ID.makeId(),
        title,
        author,
        datePublished,
        linkBookCoverImage,
        linkBookBackImage,
        numberPages,
        rating,
        genre,
        userReference,
        createdAt = new Date()
    } = {}) {
        
        if (!title) throw new BaseError("A book needs a title")
        
        if (!author) throw new BaseError("A book needs an author")

        if (!datePublished) throw new BaseError("A books needs a publishing date")

        if (!dateValid(datePublished)) throw new BaseError("The date is not valid")

        if (!numberPages) throw new BaseError("A book needs to have a page number")

        if (!userReference) throw new BaseError("The book needs to have a user reference")

        return Object.freeze({
            getId:() => id,
            getTitle:() => title,
            getAuthor:() => author,
            getDatePublished:() => datePublished,
            getNumberPages:() => numberPages,
            getUserReference:() => userReference,
            getLinkBookCoverImage:() => linkBookCoverImage,
            getLinkBookBackImage:() => linkBookBackImage,
            getRating:() => rating,
            getGenre:() => genre,
            getCreatedAt:() => createdAt
        })
    }
}