const buildUserController = require("../controllers/users/userController");
const protectMiddleware = require("../controllers/auth/protectMiddleware")
const buildUserRouter = function(router, middleware,mongooseObject) {
    
        const userController = buildUserController(mongooseObject)
        
        router.post("/signup", middleware(userController.signupUser));
        // router.delete("/:id", middleware(deleteUser));
        // router.patch("/:id", middleware(updateUser));
        // router.patch("/password", middleware(updatePassword))
        // router.patch("/resetPassword", middleware(resetPassword))
        router.patch("/updatePassword", middleware(userController.updateUserPassword))
        router.post("/login", middleware(userController.loginUser))
        router.patch("/updateme", protectMiddleware(mongooseObject), middleware(userController.updateMe) )
        // router.patch("/forgotPassword", middleware(forgotPassword))

        return router;
}

module.exports = buildUserRouter;