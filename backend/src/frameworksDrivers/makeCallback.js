// basic callback function
const makeCallback = (callback) => {
    return async (req,res,next) => {
        try {
            await callback(req,res)
        } catch(err) {
            res.json({
                status:500,
                message:"An error has occured"
            })
        }
    }
}