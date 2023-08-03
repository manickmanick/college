const db = require("./database");

module.exports = {
  insertMany: function (collection, dataToInsert) {
    return new Promise(async function (resolve, reject) {
      try {
        var database = await db.get();
        const result = await database
          .collection(collection)
          .insertMany(dataToInsert);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  },
  getAll: function (collection, projection = {}) {
    return new Promise(async function (resolve, reject) {
      try {
        const database = await db.get();
        const result = await database.collection(collection).find({}).toArray();
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  },
  update: function (collection, id, updatedData) {
    return new Promise(async function (resolve, reject) {
      try {
        const database = await db.get();
        const result = await database
          .collection(collection)
          .updateOne(id, updatedData);
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  },
  delete: function (collection, id) {
    return new Promise(async function (resolve, reject) {
      try {
        var database = await db.get();
        var result = await database.collection(collection).deleteOne(id);
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  },
  findOne: function (collection, id, projection = {}) {
    return new Promise(async function (resolve, reject) {
      try {
        const database = await db.get();
        const result = await database
          .collection(collection)
          .findOne(id, projection);
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  },
};
