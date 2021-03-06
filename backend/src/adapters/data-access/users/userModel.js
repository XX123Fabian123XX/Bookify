class User {
    constructor(mongooseObject) {
        if (!User.model) {
            this._createSchema(mongooseObject);
            User.model = mongooseObject.model("User", this.userSchema)
        }
        return User.model;
    }

    _createSchema(mongooseObject) {
        this.userSchema = new mongooseObject.Schema({
            name: {
                type:String,
                required:true
            },
            email: {
                type:String,
                unique:true,
                required:true
            },
            // TODO: REMOVE DEFAULT BEHAVIOUR OF GETTING A PASSWORD WHEN GETTING DATA
            password: {
                select:false,
                type:String,
                required:true,
                validate: {
                    validator: function(value) {
                        return value != null
                    }
                }
            },
            passwordResetToken: {
                type:String,
                select:false,
            },
            passwordResetExpires: {
                type:Number,
                select:false,
            },
            passwordLastChanged:{
                type:Number,
                select:false
            }

        })
    }
}


module.exports = User;