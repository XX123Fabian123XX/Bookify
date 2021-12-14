const buildGetAllBooks = (dbConnection) => {
    return async () => await dbConnection.getAllBooks()
} 

module.exports = buildGetAllBooks;