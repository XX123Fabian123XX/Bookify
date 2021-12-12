const {getAllBooks, getSingleBook, createBook, deleteBook, updateBook} = require("../controllers/bookController");

const buildBookRouter = function(router, middleware) {
    return function() {

        // get all books
        // router.get("/", middleware(getAllBooks))
        // router.get("/:id", middleware(getSingleBook))
        // router.post("/", middleware(createBook))
        // router.patch("/:id", middleware(updateBook))
        // router.delete("/:id", middleware(deleteBook))

        return router;
    }
}