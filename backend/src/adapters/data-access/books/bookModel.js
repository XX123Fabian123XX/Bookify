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
            id:{
                type:String,
                required:true,
                unique:true
            },
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
            // TODO: link to user
            userReference: {
                type:String,
            }    
        })

        this.bookSchema.pre("save", function(next) {
            console.log("Object is being saved")

            console.log(this)
            this.numberPages = 50000;
            next();
        })

       this.bookSchema.post("save", function(doc, next) {
            console.log("this is post middleware")
            console.log(doc);
            next()
        })

    }     
}

module.exports = Book; 
