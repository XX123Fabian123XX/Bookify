const buildGetAllBooks = (dbConnection) => {
    return async (req) => await dbConnection.getAllBooks(req.query)
} 

module.exports = buildGetAllBooks;