const { MongoClient } = require("mongodb");
const mongoURI = "mongodb://localhost:27017";
var _db = null;

var logger = require("./logger/log");
module.exports = {
  connect: async function (cb) {
    try {
      const client = new MongoClient(mongoURI);
      await client.connect();
      _db = client.db("college");
      var d = new Date();
      logger.info(`mongodb connected successfully,${d}`);
      cb(_db);
    } catch (err) {
      logger.error(`mongodb connection error,${err}`);
      process.exit();
    }
  },
  get: async function () {
    if (_db) return _db;
    else {
      var self = this;
      return new Promise(async function (resolve, reject) {
        self.connect(function (db) {
          resolve(db);
        });
      });
    }
  },
};
