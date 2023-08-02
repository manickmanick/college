const { MongoClient } = require("mongodb");
const mongoURI = "mongodb://localhost:27017";
var _db = null;
const client = new MongoClient(mongoURI);
module.exports = {
  connect: async function () {
    await client.connect();
    _db = client.db("college");
  },
  get: function () {
    if (_db) return _db;
    else {
      this.connect();
      return _db;
    }
  },
};
