const AppError = require("../controllers/errors/appError");
const apiFeatures = require("./apiFeatures");

const buildGlobalHandlerFactory = (Model) => {

    const createEntity = async(information) => {
        console.log("entity")
        console.log(information)

        if (information.id) information._id = information.id
        
        const newEntity = (await new Model(information).save()).toObject();
        return newEntity
    }

    const getAllEntities = async(query) => {
        const firstQuery = Model.find({})
        const finalQuery = new apiFeatures(firstQuery, query).filter().sort().paginate().limitFields().query;

        return (await finalQuery).map(el => el.toObject())
    }

    const getSingleEntity = async(query, errorMessageNotFound) => {
        const singleEntity = await Model.findOne(query); 

        if (!singleEntity) throw new AppError(errorMessageNotFound, 404)

        return singleEntity.toObject();
    }

    const deleteEntity = async(id) => {
        const res = await Model.deleteOne({_id:id})

        if (res.deletedCount === 0) throw new AppError(`Object with id ${id} was not found`)
    }

    const updateEntity = async(id, newInformation) => {
        newInformation._id = id;
        return (await Model.findOneAndUpdate({_id:id}, newInformation, {new:true})).toObject()
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