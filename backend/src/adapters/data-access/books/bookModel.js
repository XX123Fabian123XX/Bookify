class Book {
    constructor(mongooseObject) {
        if (!Book.model) {
            this._createSchema(mongooseObject);
            Book.model = mongooseObject.model("Book", this.bookSchema)
            console.log("new model")
        }
        return Book.model
    }

    _createSchema(mongooseObject) {
        this.bookSchema = new mongooseObject.Schema({
            id:{
                type:String,
                required:true,
                unique:true
            },
            title: {
                type:String,
                required:true,
            },
            author: {
                type:String,
                required:true
            },
            datePublished: {
                type:Date,
                required:true
            },
            linkBookCover: {
                type:String,
                unique:true
            },
            linkBookBack: {
                type:String,
                unique:true
            },
            numberPages: {
                type:Number,
                required:true
            },
            rating: {
                type:Number
            },
            genre: {
                type:String,
            },
            createdAt: {
                type:Date,
                default: new Date,
            },
            userReference: {
                type:String,
            }    
        })
    }     
}

// const mongoose = require("mongoose")

// const bookSchema = new mongoose.Schema({
//     id:{
//         type:String,
//         required:true,
//         unique:true
//     },
//     title: {
//         type:String,
//         required:true,
//     },
//     author: {
//         type:String,
//         required:true
//     },
//     datePublished: {
//         type:Date,
//         required:true
//     },
//     linkBookCover: {
//         type:String,
//         unique:true
//     },
//     linkBookBack: {
//         type:String,
//         unique:true
//     },
//     numberPages: {
//         type:Number,
//         required:true
//     },
//     rating: {
//         type:Number
//     },
//     genre: {
//         type:String,
//     },
//     createdAt: {
//         type:Date,
//         default: new Date,
//     },
//     userReference: {
//         type:String,
//     }    
// })
// const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
