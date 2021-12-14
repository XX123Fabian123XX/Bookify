const buildDeleteBook = (dbConnection) => {
    return async (id) => await dbConnection.deleteBook(id)
}

module.exports = buildDeleteBook;