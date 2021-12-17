class User {
    constructor(mongooseObject) {
        if (!User.instance) {
            this._createSchema(mongooseObject);
            User.model = mongooseObject.model("User", this.userSchema)
        }
        return User.instance;
    }

    _createSchema(mongooseObject) {
        this.userSchema = new mongooseObject.Schema({
            id:{
                type:String,
                required:true,
                unique:true
            },
            email: {
                type:String,
                unique:true,
                required:true
            },
            password: {
                type:String,
                required:true
            },
            passwordConfirm: {
                type:String,
                required:true,
                validate: {
                    validator: function(el) {
                        return el === this.password
                    },
                    message: "Passwords are not the same"
                }
            },
        })
    }
}

module.exports = User