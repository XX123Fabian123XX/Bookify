const buildBookController = require("../controllers/books/bookController");
const protectMiddleware = require("../controllers/auth/protectMiddleware");
const buildBookRouter = function(router, middleware, db) {
    const bookController = buildBookController(db);
    // get all books
    
    router.get("/", protectMiddleware(db), middleware(bookController.getAllBooks))
    router.get("/:id", middleware(bookController.getSingleBook))
    router.post("/", middleware(bookController.createBook))
    router.patch("/:id", middleware(bookController.updateBook))
    router.delete("/:id", middleware(bookController.deleteBook))

    return router;
}

module.exports = buildBookRouter;