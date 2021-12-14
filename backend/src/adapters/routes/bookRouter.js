const buildBookController = require("../controllers/books/bookController");

const buildBookRouter = function(router, middleware, db) {
    const bookController = buildBookController(db);
    // get all books
    
    router.get("/", middleware(bookController.getAllBooks))
    // router.get("/:id", middleware(getSingleBook))
    // router.post("/", middleware(createBook))
    // router.patch("/:id", middleware(updateBook))
    // router.delete("/:id", middleware(deleteBook))

    return router;
}

module.exports = buildBookRouter;