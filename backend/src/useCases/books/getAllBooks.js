exports.makeGetAllBooks = (dbConnection) => {
    return async () => await dbConnection.getAllBooks()
} 