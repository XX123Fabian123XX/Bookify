const userModel = require("./userModel")
const apiFeatures = require("../apiFeatures");
const AppError = require("../../controllers/errors/appError");

// TODO: REFACER USER DB AND BOOK DB INTO ONE SERVICE

const makeUserDbConnection = (mongooseObject) => {
    const User = new userModel(mongooseObject);

    const createUser = async (userInformation) => {
        console.log("this is the user information")
        console.log(userInformation)
        const newUser = await new User(userInformation).save()
        delete newUser["_id"]
        return newUser.toObject()
    }

    const getAllUsers = async (query) => {
        const firstQuery = User.find({})
        const finalQuery = new apiFeatures(firstQuery, query).filter().sort().paginate().limitFields().query;
        
        return (await finalQuery).map(el => el.toObject());
    }

    const getSingleUser = async(id) => {
        const singleUser = (await User.find({id},{_id:0}))

        if (!singleUser) throw new AppError(`No user was found with this id ${id}`, 404)

        return singleUser.toObject();
    }

    const deleteUser = async(id) => {
        const deleteRes = (await User.deleteOne({id}))

        if (deleteRes.deletedCount == 0) throw new AppError(`No user was found with this id ${id}`)
    }

    const updateUser = async(id, newUserInformation) => {
        return (await User.findOneAndUpdate({id}, newUserInformation, {new:true, fields:{_id:0}})).toObject()
    }

    return {
        deleteUser,
        updateUser,
        getSingleUser,
        getAllUsers,
        createUser
    }
}

module.exports = makeUserDbConnection;



