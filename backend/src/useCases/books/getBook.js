const buildGetBook = (dbConnection) => {
    return async function(id) {
        return await dbConnection.getSingleBook(id)
    }
}

module.exports = buildGetBook;