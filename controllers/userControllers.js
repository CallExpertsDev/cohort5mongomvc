const UserModel = require("../models/userModel");

const postUser = async (request, response) => {
  try {
    console.log("POST USER");
    const userInstance = new UserModel(request.body);
    const createdUser = await UserModel.create(userInstance);
    response.status(201).send(createdUser);
  } catch (error) {
    console.log(error);
  }
};

const getUsers = async (request, response) => {
  try {
    console.log("GET ALL USERS");
    const users = await UserModel.find();
    response.status(200).send(users);
  } catch (error) {
    console.log(error);
  }
};

const getUserById = async (request, response) => {
  try {
    console.log("GET ONE USER BY ID");
    const id = request.query.id;
    const user = await UserModel.findById(id);
    response.status(200).send(user);
  } catch (error) {
    console.log(error);
  }
};

const getUserByUsername = async (request, response) => {
  try {
    console.log("GET ONE USER BY USERNAME");
    const un = request.query.username;
    const user = await UserModel.findOne({ username: un });
    response.status(200).send(user);
  } catch (error) {
    console.log(error);
  }
};

const putUser = async (request, response) => {
  try {
    console.log("UPDATE ONE USER");
    const id = request.query.id;
    const un = request.body.username;
    const pw = request.body.password;
    const currentUser = await UserModel.findById(id);
    console.log(currentUser);
    const user = await UserModel.findByIdAndUpdate(id, {
      username: un ? un : currentUser.username,
      password: pw ? pw : currentUser.password
    });
    response.status(200).send(user);
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (request, response) => {
  try {
    console.log("DELETE ONE USER");
    const id = request.query.id;
    const user = await UserModel.findByIdAndDelete(id);
    response.status(200).send(user);
  } catch (error) {
    console.log(error);
  }
};

const deleteUserByUsername = async (request, response) => {
  try {
    console.log("DELETE ONE USER BY USERNAME");
    const un = request.query.username;
    const user = await UserModel.findOneAndDelete({ username: un });
    response.status(200).send(user);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  postUser,
  getUsers,
  getUserById,
  getUserByUsername,
  putUser,
  deleteUser,
  deleteUserByUsername
};
