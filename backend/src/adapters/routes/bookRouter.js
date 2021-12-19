const buildBookController = require("../controllers/books/bookController");
const protectMiddleware = require("../controllers/auth/protectMiddleware");
const multer = require("multer")
const AppError = require("../controllers/errors/appError")


const storage = multer.diskStorage({
    destination: function(req,file, cb) {

        cb(null, "./uploads")

    },
    filename: function(req,file,cb) {
        cb(null, file.originalname)
    }
})

const fileFilter = (req,file,cb) => {
    console.log(file.mimetype)
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png") {
        cb(null, true)
        return
    }
    cb(new AppError("Please only submit jpeg or png"), false)
}

const upload = multer({storage, fileFilter, limits: {fileSize:1024 * 1024*50 }});

const buildBookRouter = function(router, middleware, mongoose) {
    const bookController = buildBookController(mongoose);
    // get all books
    
    router.get("/", middleware(bookController.getAllBooks))
    router.get("/:id", middleware(bookController.getSingleBook))


    // user has to beee authenticated
    router.use(middleware(protectMiddleware(mongoose), false))

    const bookUpload = upload.fields([{name:"bookCoverImage", maxCount:1}, {name:"bookBackImage", maxCount:1}])

    router.post("/", bookUpload, middleware(bookController.createBook))

    // the user that has created the books is only allowed to patch and update them
    router.patch("/:id", middleware(bookController.updateBook))
    router.delete("/:id", middleware(bookController.deleteBook))

    return router;
}

module.exports = buildBookRouter;