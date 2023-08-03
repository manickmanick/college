const db = require("../../query");
var collection = "student";
const { ObjectId } = require("mongodb");

module.exports = {
  addStudent: function (req, res, next) {
    db.insertMany(collection, [req.body])
      .then(function (result) {
        req.mail = req.body.email;
        req.message = "Student was added successfully";
        next();
        res.status(200).json(result);
      })
      .catch(function (error) {
        res.status(400).json(error);
      });
  },
  updateStudent: function (req, res, next) {
    id = new ObjectId(req.params.id);
    db.update(collection, { _id: id }, { $set: req.body })
      .then(function (result) {
        if (result) {
          db.findOne(collection, { _id: id })
            .then(function (mail) {
              req.mail = mail.email;
              req.message = `Student data was updated`;
              next();
              res.status(200).json(result);
            })
            .catch(function (err) {
              throw new Error(err);
            });
        }
      })
      .catch(function (err) {
        res.status(400).json(err);
      });
  },
  getStudent: function (req, res) {
    db.getAll(collection, {})
      .then(function (result) {
        res.status(200).json(result);
      })
      .catch(function (err) {
        res.status(400).json(err);
      });
  },
  deleteStudent: function (req, res, next) {
    id = new ObjectId(req.params.id);
    db.delete(collection, { _id: id })
      .then(function (result) {
        res.status(200).json(result);
      })
      .catch(function (err) {
        res.status(400).json(err);
      });
  },
  findStudentById: function (req, res) {
    id = new ObjectId(req.params.id);
    db.findOne(collection, { _id: id })
      .then(function (result) {
        res.status(200).json(result);
      })
      .catch(function (err) {
        res.status(400).json(err);
      });
  },
};
