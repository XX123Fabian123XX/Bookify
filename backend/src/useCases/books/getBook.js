export const MakeGetBook = (dbConnection) => {
    return async function(id) {
        return await dbConnection.getBook(id)
    }
}