const db = require("../../query");
var collection = "admin";
const auth = require("../../authorization/auth");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { ObjectId } = require("mongodb");

module.exports = {
  signup: async function (req, res) {
    const { username, password } = req.body;
    hashedPassword = await bcrypt.hash(password, 10);
    req.body.password = hashedPassword;
    db.insertMany(collection, [req.body])
      .then(function (result) {
        res.status(200).json(result);
      })
      .catch(function (err) {
        res.status(400).json(err);
      });
  },
  login: function (req, res) {
    var id = new ObjectId(req.body.id);
    const { username, password } = req.body;
    db.findOne(collection, { _id: id })
      .then(async function (user) {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res.status(401).json({ error: "Invalid credentials" });
        }
        const token = jwt.sign(
          { username: user.username },
          `${process.env.secret_key}`,
        );
        res.status(200).json({ token });
      })
      .catch(function (err) {
        res.status(400).json(err);
      });
  },
  changePassword: async function (req, res) {
    id = new ObjectId(req.params.id);
    const { oldPassword, newPassword } = req.body;
    db.findOne(collection, { _id: id })
      .then(async function (user) {
        const isPasswordValid = await bcrypt.compare(
          oldPassword,
          user.password,
        );
        if (!isPasswordValid) {
          return res.status(401).json({ error: "Invalid current password" });
        }
        const newHashedPassword = await bcrypt.hash(newPassword, 10);
        db.update(
          collection,
          { _id: id },
          { $set: { password: newHashedPassword } },
        ).then(function (result) {
          res.status(200).json("password updated successfully");
        });
      })
      .catch(function (err) {
        res.status(400).json(err);
      });
  },
};
