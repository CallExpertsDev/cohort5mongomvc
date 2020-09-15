require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const PORT = 3000;

const app = express();
app.use(express.json());

const un = process.env.MONGO_USER;
const pw = process.env.MONGO_PASSWORD;
mongoose.connect(
  `mongodb+srv://${un}:${pw}@cluster0.4nkhd.mongodb.net/cohort5?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
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

app.listen(PORT, () => console.log(`App is running on ${PORT}`));
