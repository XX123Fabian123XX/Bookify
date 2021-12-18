const buildUserController = require("../controllers/users/userController");

const buildUserRouter = function(router, middleware,mongooseObject) {
    return function() {
        const userController = buildUserController(mongooseObject)

        // router.delete("/:id", middleware(deleteUser));
        router.post("/signup", middleware(userController.signupUser));
        // router.patch("/:id", middleware(updateUser));
        // router.patch("/password", middleware(updatePassword))
        // router.patch("/resetPassword", middleware(resetPassword))
        // router.post("/login", middleware(loginUser))
        // router.patch("/forgotPassword", middleware(forgotPassword))

        return router;
    }
}

module.exports = buildUserRouter;