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
            id:{
                type:String,
                required:true,
                unique:true
            },
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
                type:String,
                required:true
            },
        })
    }
}

module.exports = User