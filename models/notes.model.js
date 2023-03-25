const mongoose = require("mongoose");

const notesschema = mongoose.Schema(
  {
    title: String,
    body: String,
    sub: String,
    userID: String
  },
  {
    versionKey: false,
  }
);
let notesModel = new mongoose.model("note", notesschema);
module.exports = { notesModel };
