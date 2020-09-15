require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const PORT = 3000;
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const un = process.env.MONGO_USER;
const pw = process.env.MONGO_PASSWORD;
mongoose.connect(
  `mongodb+srv://${un}:${pw}@cluster0.4nkhd.mongodb.net/cohort5?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

const UserModel = mongoose.model("user", userSchema);

app.post("/user", async (request, response) => {
  try {
    console.log("POST USER");
    const userInstance = new UserModel(request.body);
    const createdUser = await UserModel.create(userInstance);
    response.status(201).send(createdUser);
  } catch (error) {
    console.log(error);
  }
});

app.get("/users", async (request, response) => {
  try {
    console.log("GET ALL USERS");
    const users = await UserModel.find();
    response.status(200).send(users);
  } catch (error) {
    console.log(error);
  }
});

app.get("/userbyid", async (request, response) => {
  try {
    console.log("GET ONE USER BY ID");
    const id = request.query.id;
    const user = await UserModel.findById(id);
    response.status(200).send(user);
  } catch (error) {
    console.log(error);
  }
});

app.get("/userbyusername", async (request, response) => {
  try {
    console.log("GET ONE USER BY USERNAME");
    const un = request.query.username;
    const user = await UserModel.findOne({ username: un });
    response.status(200).send(user);
  } catch (error) {
    console.log(error);
  }
});

app.put("/user", async (request, response) => {
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
});

app.delete("/user", async (request, response) => {
  try {
    console.log("DELETE ONE USER");
    const id = request.query.id;
    const user = await UserModel.findByIdAndDelete(id);
    response.status(200).send(user);
  } catch (error) {
    console.log(error);
  }
});

app.get("/", async (request, response) => {
  try {
    console.log("SEND HOME PAGE");
    response.sendFile(path.join(__dirname + "/index.html"));
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
});

app.get("/about", async (request, response) => {
  try {
    console.log("SEND ABOUT PAGE");
    response.sendFile(path.join(__dirname + "/about.html"));
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
});

app.listen(PORT, () => console.log(`App is running on ${PORT}`));
