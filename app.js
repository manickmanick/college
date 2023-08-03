const express = require("express");
require("dotenv").config();
const app = express();
const jwt = require("jsonwebtoken");
const db = require("./database");
const bodyparser = require("body-parser");
var admin = require("./admin");
var auth = require("./authorization/auth");
const bcrypt = require("bcryptjs");
const logger = require("./logger/log");

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

db.connect(async function (db) {
  const adminExists = await db
    .collection("admin")
    .findOne({ username: admin.username });
  if (!adminExists) {
    admin["password"] = await bcrypt.hash(admin["password"], 10);
    db.collection("admin")
      .insertOne(admin)
      .then(function (result) {
        logger.info("admin data was inserted in db");
      })
      .catch(function (err) {
        logger.error("error while inserting the admin");
      });
  }
});

app.use("/auth", auth.verifyToken);
app.use("/", require("./routes"));

//file upload purpose
app.get("/fileUpload", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(5000, function () {
  console.log(`server running on port 5000`);
});
