const userModel = require("./userModel")
const apiFeatures = require("../apiFeatures");
const AppError = require("../../controllers/errors/appError");
const buildGlobalHandlerFactory = require("../globalHandlerFactory");
// TODO: REFACER USER DB AND BOOK DB INTO ONE SERVICE

const makeUserDbConnection = (mongooseObject) => {
    const User = new userModel(mongooseObject);

    const globalHandlerFactory = buildGlobalHandlerFactory(User);

    const resetPassword = async(id, newPassword) => {
        
        return await globalHandlerFactory.updateEntity(id, {
            password: newPassword, 
            passwordLastChanged: new Date().getTime() - 1000,
            passwordResetExpires:null,
            passwordResetToken:null
        })
    }

    return {
        deleteUser:globalHandlerFactory.deleteEntity,
        updateUser: globalHandlerFactory.updateEntity,
        getSingleUser: async(id, extraFields) => await globalHandlerFactory.getSingleEntity({_id:id}, `No User was found with this id ${id}`, null, extraFields),
        getAllUsers:globalHandlerFactory.getAllEntities,
        createUser:globalHandlerFactory.createEntity,
        getSingleUserByEmail: async(email, extraFields) => await globalHandlerFactory.getSingleEntity({email}, `No User was found with this email ${email}`, null,extraFields),
        getSingleUserByToken: async(token, extraFields) => await globalHandlerFactory.getSingleEntity({passwordResetToken: token}, `No User was found with this token ${token}`, null, extraFields),
        resetPassword
    }
}

module.exports = makeUserDbConnection;



