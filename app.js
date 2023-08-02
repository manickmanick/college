const express = require("express");
require("dotenv").config();
const app = express();
const jwt = require("jsonwebtoken");
const db = require("./database");
const bodyparser = require("body-parser");
const secretKey = "sample";

const users = [
  {
    id: 1,
    username: "user1",
    password: "password1",
  },
];

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

db.connect();

app.use("/", require("./routes"));

app.listen(5000, function () {
  console.log(`server running on port 3000`);
});
