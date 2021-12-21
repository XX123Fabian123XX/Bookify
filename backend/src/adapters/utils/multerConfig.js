const multer = require("multer")
const AppError = require("../controllers/errors/appError")
const crypto = require("crypto");
const path = require("path")

const storage = multer.diskStorage({
    destination: function(req,file, cb) {

        cb(null, "./uploads")

    },
    filename: function(req,file,cb) {
        cb(null, `${crypto.randomBytes(16).toString("hex")}${path.extname(file.originalname)}`)
    }
})

const fileFilter = (req,file,cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png") {
        cb(null, true)
        return
    }
    cb(new AppError("Please only submit jpeg or png",400), false)
}

const upload = multer({storage, fileFilter, limits: {fileSize:1024 * 1024*50 }});

const uploadBookImages = upload.fields([{name:"bookCoverImage", maxCount:1}, {name:"bookBackImage", maxCount:1}])

module.exports = uploadBookImages;