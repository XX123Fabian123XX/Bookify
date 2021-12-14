//const {forgotPassword, loginUser, resetPassword, signupUser, updatePassword, updateUser, deleteUser} = require("../controllers/userController")

const buildUserRoute = function(router, middleware) {
    return function() {
        
        // router.delete("/:id", middleware(deleteUser));
        // router.post("/signup", middleware(signupUser));
        // router.patch("/:id", middleware(updateUser));
        // router.patch("/password", middleware(updatePassword))
        // router.patch("/resetPassword", middleware(resetPassword))
        // router.post("/login", middleware(loginUser))
        // router.patch("/forgotPassword", middleware(forgotPassword))

        return router;
    }
}
