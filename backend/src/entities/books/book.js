// business logic for the books
exports.buildMakeBook = function(dateValid) {
    return async function({
        title,
        author,
        datePublished,
        linkBookCover,
        linkBookBack,
        numberPages,
        rating,
        genre,
        userReference,
        createdAt = new Date()
    } = {}) {
        if (!title) throw new Error("A book needs a title")
        
        if (!author) throw new Error("A book needs an author")

        if (!datePublished) throw new Error("A books needs a publishing date")

        if (!dateValid(datePublished)) throw new Error("The date is not valid")

        if (!numberPages) throw new Error("A book needs to have a page number")

        if (!userReference) throw new Error("The book needs to have a user reference")

        return Object.freeze({
            getTitle:() => title,
            getAuthor:() => author,
            getDatePublished:() => datePublished,
            getNumberPages:() => numberPages,
            getUserReference:() => userReference,
            getLinkBookCover:() => linkBookCover,
            getLinkBookBack:() => linkBookBack,
            getRating:() => rating,
            getGenre:() => genre,
            getCreatedAt:() => createdAt
        })
    }
}