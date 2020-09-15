require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const PORT = 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const un = process.env.MONGO_USER;
const pw = process.env.MONGO_PASSWORD;
mongoose.connect(
  `mongodb+srv://${un}:${pw}@cluster0.4nkhd.mongodb.net/cohort5?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

module.exports = { app, PORT };
