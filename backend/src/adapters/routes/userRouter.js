const buildUserController = require("../controllers/users/userController");
const protectMiddleware = require("../controllers/auth/protectMiddleware")
const buildUserRouter = function(router, middleware,mongooseObject) {
    
        const userController = buildUserController(mongooseObject)
        
        router.post("/signup", middleware(userController.signupUser));
        // router.delete("/:id", middleware(deleteUser));
        router.post("/resetPassword", middleware(userController.resetPassword))
        router.patch("/updatePassword", middleware(protectMiddleware(mongooseObject), false), middleware(userController.updateUserPassword))
        router.post("/login", middleware(userController.loginUser))
        router.patch("/updateme", middleware(protectMiddleware(mongooseObject), false), middleware(userController.updateMe) )
        router.post("/forgotPassword", middleware(userController.forgotPassword))

        return router;
}

module.exports = buildUserRouter;