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

const uploadBookImages = upload.fields([{name:"bookCoverImage", maxCount:1}, {name:"bookBackImage", maxCount:1}])

module.exports = uploadBookImages;
