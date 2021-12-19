const AppError = require("../controllers/errors/appError");
const apiFeatures = require("./apiFeatures");

const buildGlobalHandlerFactory = (Model) => {

    const createEntity = async(information) => {
        console.log("entity")
        console.log(information)
        
        const newEntity = (await new Model(information).save()).toObject();
        delete newEntity["_id"];
        return newEntity
    }

    const getAllEntities = async(query) => {
        const firstQuery = Model.find({})
        const finalQuery = new apiFeatures(firstQuery, query).filter().sort().paginate().limitFields().query;

        return (await finalQuery).map(el => el.toObject())
    }

    const getSingleEntity = async(query, errorMessageNotFound) => {
        const singleEntity = await Model.findOne(query, {_id:0}); 

        if (!singleEntity) throw new AppError(errorMessageNotFound, 404)

        return singleEntity.toObject();
    }

    const deleteEntity = async(id) => {
        const res = await Model.deleteOne({id})

        if (res.deletedCount === 0) throw new AppError(`Object with ${id} was not found`)
    }

    const updateEntity = async(id, newInformation) => {
        return (await Model.findOneAndUpdate({id}, newInformation, {new:true, fields:{_id:0}})).toObject()
    }

    return {
        createEntity,
        updateEntity,
        getAllEntities,
        deleteEntity,
        getSingleEntity
    }
}

module.exports = buildGlobalHandlerFactory;