const buildBookController = require("../controllers/books/bookController");
const protectMiddleware = require("../controllers/auth/protectMiddleware");
const uploadBookImages = require("../utils/multerConfig");
const buildUserCreatedBookMiddleware = require("../controllers/books/userCreatedBookMiddleware");

const buildBookRouter = function(router, middleware, mongoose) {
    const bookController = buildBookController(mongoose);
    // get all books
    
    router.get("/", middleware(bookController.getAllBooks))
    router.get("/:id", middleware(bookController.getSingleBook))


    // user has to be authenticated
    router.use(middleware(protectMiddleware(mongoose), false))

    router.post("/", uploadBookImages, middleware(bookController.createBook))

    // the user that has created the books is only allowed to patch and update them
    router.patch("/:id", middleware(buildUserCreatedBookMiddleware(mongoose), false), uploadBookImages, middleware(bookController.updateBook))
    router.delete("/:id", middleware(buildUserCreatedBookMiddleware(mongoose), false), middleware(bookController.deleteBook))

    return router;
}

module.exports = buildBookRouter;