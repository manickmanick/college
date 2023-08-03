const db = require("./database");

module.exports = {
  insertTestData: async function (collectionName) {
    return new Promise(async function (resolve, reject) {
      arr = [];
      for (i = 0; i <= 100; i++) {
        obj = {
          name: i,
          email: "sample@gmail.com",
          phoneNumber: "123456789",
          role: "User",
          status: "Active",
          createdOn: new Date().toISOString(),
        };
        arr.push(obj);
      }
      try {
        var database = await db.get();
        var result = await database.collection(collectionName).insertMany(arr);
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  },
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
  findByPage: function (
    collection,
    query,
    projection,
    resultsPerPage,
    desiredPage,
  ) {
    return new Promise(async function (resolve, reject) {
      try {
        const page = desiredPage ? desiredPage : 1;
        var database = await db.get();
        var totalDocuments = await database
          .collection(collection)
          .countDocuments();
        const totalPages = Math.ceil(totalDocuments / resultsPerPage);
        const skip = (page - 1) * resultsPerPage;
        const result = await database
          .collection(collection)
          .find()
          .skip(skip)
          .limit(resultsPerPage)
          .toArray();
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  },
  count: function (collection) {
    return new Promise(async function (resolve, reject) {
      var database = await db.get();
      var result = await database.collection(collection).countDocuments();
    });
  },
};
