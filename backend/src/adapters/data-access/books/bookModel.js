
class Book {
    constructor(mongooseObject) {
        if (!Book.model) {
            this._createSchema(mongooseObject);
            Book.model = mongooseObject.model("Book", this.bookSchema)
        }
        return Book.model
    }

    _createSchema(mongooseObject) {
        this.bookSchema = new mongooseObject.Schema({
            title: {
                type:String,
                required:true,
                unique:true
            },
            author: {
                type:String,
                required:true
            },
            datePublished: {
                type:String,
                required:true
            },
            // AND LINK BOOK BACK IMAGE
            linkBookCoverImage: {
                type:String,
            },
            linkBookBackImage: {
                type:String,

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
                type:mongooseObject.Schema.Types.ObjectId,
                ref:"User",
            }    
        })
    }     
}

module.exports = Book; 
