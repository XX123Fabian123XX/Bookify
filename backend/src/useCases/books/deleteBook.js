exports.makeDeleteBook = (dbConnection) => {
    return async (id) => await dbConnection.deleteBook(id)
}