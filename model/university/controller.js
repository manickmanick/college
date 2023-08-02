const db = require("../../query");
var collection = "university";
const { ObjectId } = require("mongodb");
module.exports = {
  insertUniversities: function (req, res) {
    db.insertMany(collection, [req.body])
      .then(function (data) {
        res.status(200).json(data);
      })
      .catch(function (err) {
        res.status(400).json(err);
      });
  },
  getUniversity: function (req, res) {
    db.getAll(collection, {})
      .then(function (result) {
        res.json(result);
      })
      .catch(function (err) {
        res.json(err);
      });
  },
  updateUniversity: function (req, res) {
    id = new ObjectId(req.body.id);
    delete req.body.id;
    db.update(collection, { _id: id }, { $set: req.body })
      .then(function (result) {
        res.status(200).json(result);
      })
      .catch(function (error) {
        res.status(400).json(error);
      });
  },
  deleteUniversity: function (req, res) {
    id = new ObjectId(req.params.id);
    db.delete(collection, { _id: id })
      .then(function (result) {
        res.status(200).json(result);
      })
      .catch(function (error) {
        res.status(400).json(error);
      });
  },
};
