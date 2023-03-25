const mongoose = require("mongoose");

const userschema = mongoose.Schema(
  {
    location: String,
    email: String,
    password: String,
    age: Number,
  },
  {
    versionKey: false,
  }
);
let userModel = new mongoose.model("useradda", userschema);
module.exports = { userModel };
