// basic callback function
const makeCallback = (callback) => {
    return async (req,res,next) => {
        try {
            const response = await callback(req,res)
            console.log(response)
            res.json(response)
        } catch(err) {
            // error object erstellen
            
            // error object in next
            next(err)
            
        }
    }
}

module.exports = makeCallback;