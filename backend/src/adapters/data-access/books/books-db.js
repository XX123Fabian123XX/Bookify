const bookModel = require("./bookModel");
const buildGlobalHandlerFactory = require("../globalHandlerFactory");


const makeDbConnection = (mongoose) =>  {
    const Book = new bookModel(mongoose)

    const globalHandlerFactory = buildGlobalHandlerFactory(Book);
    
    return {
        getAllBooks:globalHandlerFactory.getAllEntities,
        getSingleBook: async (id) => await globalHandlerFactory.getSingleEntity({id}, `No book was found with the id ${id}`),
        createBook: globalHandlerFactory.createEntity,
        updateBook:globalHandlerFactory.updateEntity,
        deleteBook: globalHandlerFactory.deleteEntity
    }
}

module.exports = makeDbConnection