const bookModel = require("./bookModel");
const buildGlobalHandlerFactory = require("../globalHandlerFactory");


const makeDbConnection = (mongoose) =>  {
    const Book = new bookModel(mongoose)

    const globalHandlerFactory = buildGlobalHandlerFactory(Book);
    
    return {
        getAllBooks:async(query) => globalHandlerFactory.getAllEntities(query, "userReference"),
        getSingleBook: async (id) => await globalHandlerFactory.getSingleEntity({id}, `No book was found with the id ${id}`, "userReference"),
        createBook: globalHandlerFactory.createEntity,
        updateBook:globalHandlerFactory.updateEntity,
        deleteBook: globalHandlerFactory.deleteEntity
    }
}

module.exports = makeDbConnection