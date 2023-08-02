const db = require("../../query");
var collection = "student";
const { ObjectId } = require("mongodb");

module.exports = {
  addStudent: function (req, res, next) {
    db.insertMany(collection, [req.body])
      .then(function (result) {
        req.message = "Student was added successfully";
        next();
        res.status(200).json(result);
      })
      .catch(function (error) {
        res.status(400).json(error);
      });
  },
};
