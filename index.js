const express = require("express");
const ejs = require("ejs");
const PORT = process.env.PORT || 4000;
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const userModel = require("./userModel");
var bodyParser = require("body-parser");

// database
mongoose.connect(process.env.MONGO_URI);
mongoose.set("strictQuery", false);
mongoose.connection.on("connected", () => {
  console.log("connected to the database");
});

const app = express();
app.set("view engine", "ejs");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", (req, res) => {
  const { fullName, email, phoneNumber, package } = req.body;
  console.log(req.body);

  const user = new userModel({
    fullName,
    email,
    phoneNumber,
    package,
  });
  user
    .save()
    .then((result) => {
      res.render("message");
    })
    .catch((e) => {
      res.json({ message: e });
    });
});

app.listen(PORT, () => {
  console.log("app is running on " + PORT);
});
