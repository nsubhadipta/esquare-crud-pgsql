const schemas = require("../utils/RequestValidators/user.scheme");
const middleware = require("../middlewares/validationMiddleware");

module.exports = (router) => {
  const userController = require("../controllers/userController");

  // Add a new user
  router.post("/users", middleware(schemas.userAdd), userController.createUser);
  
  // Get all users
  router.get("/users", userController.getAllUsers);
  
  // Update a user by ID
  router.put("/users/:id", middleware(schemas.userEdit), userController.updateUser);
  
  // Delete a user by ID
  router.delete("/users/:id",  userController.deleteUser);
 
};
