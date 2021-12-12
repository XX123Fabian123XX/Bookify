exports.makeGetBook = (dbConnection) => {
    return async function(id) {
        return await dbConnection.getBook(id)
    }
}