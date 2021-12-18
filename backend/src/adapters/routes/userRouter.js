const buildUserController = require("../controllers/users/userController");

const buildUserRouter = function(router, middleware,mongooseObject) {
    
        const userController = buildUserController(mongooseObject)
        
        router.post("/signup", middleware(userController.signupUser));
        // router.delete("/:id", middleware(deleteUser));
        // router.patch("/:id", middleware(updateUser));
        // router.patch("/password", middleware(updatePassword))
        // router.patch("/resetPassword", middleware(resetPassword))
        router.post("/login", middleware(userController.loginUser))
        // router.patch("/forgotPassword", middleware(forgotPassword))

        return router;
}

module.exports = buildUserRouter;