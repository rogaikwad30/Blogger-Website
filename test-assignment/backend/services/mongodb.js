const mongoose = require("mongoose");
const config = require("../config.json");

class Database {
  constructor() {
    this._connect();
  }
  _connect() {
    mongoose
      .connect(config.mongo_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Database connection successful");
      })
      .catch((err) => {
        console.error("Database connection error : ", err);
      });
  }
}

module.exports = new Database();