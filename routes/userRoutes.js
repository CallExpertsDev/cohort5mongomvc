const {
  postUser,
  getUsers,
  getUserById,
  getUserByUsername,
  putUser,
  deleteUser,
  deleteUserByUsername
} = require("../controllers/userControllers");

//user routes

const userRoutes = app => {
  app.post("/user", postUser);
  app.get("/users", getUsers);
  app.get("/userbyid", getUserById);
  app.get("/userbyusername", getUserByUsername);
  app.put("/user", putUser);
  app.delete("/user", deleteUser);
  app.delete("/userbyusername", deleteUserByUsername);
};

module.exports = { userRoutes };
