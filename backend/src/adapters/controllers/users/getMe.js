const buildGetMe =  () => {
    return async (req) => {
        return {
            message:"success",
            status:200,
            body: {
                data:{
                    name:req.user.name,
                    email: req.user.email
                }
            }
        }
    } 
}

module.exports = buildGetMe;