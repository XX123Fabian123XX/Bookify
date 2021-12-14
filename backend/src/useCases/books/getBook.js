const buildGetBook = (dbConnection) => {
    return async function(id) {
        return await dbConnection.getBook(id)
    }
}

module.exports = buildGetBook;