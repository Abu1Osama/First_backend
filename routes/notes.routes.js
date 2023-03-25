const express = require("express");
const notesRouter = express.Router();
const { notesModel } = require("../models/notes.model");
const jwt=require("jsonwebtoken")
require("dotenv").config

notesRouter.get("/", async (req, res) => {
const token=req.headers.authorization
const decode=jwt.verify(token,process.env.secret_code)

  try {
    if(decode){
      const notes = await notesModel.find({"userID":decode.userID});
      res.status(200).send(notes);
    }
   
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});



notesRouter.post("/add", async (req, res) => {
  try {
    const notes = new notesModel(req.body);
    await notes.save();
    res.status(200).send({ msg: "new notes has been added" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

notesRouter.patch("/update/:id", async (req, res) => {
  let ID = req.params.id;
  let payload = req.body;
  let data = await notesModel.findOne({ _id: ID });
  let userID_in_notes = data.userID;
  let userID_req = req.body.userID;
  try {
    if ((userID_in_notes = userID_req)) {
      await notesModel.findByIdAndUpdate(
        {
          _id: ID,
        },
        payload
      );
      res.send(`data with ${ID} got updated`);
    } else {
      res.send("Not Authorised");
    }
  } catch (error) {
    res.send(error);
  }
});
notesRouter.delete("/delete/:id", async (req, res) => {
  let ID = req.params.id;
  let payload = req.body;
  let data = await notesModel.findOne({ _id: ID });
  let userID_in_notes = data.userID;
  let userID_req = req.body.userID;
  try {
    if ((userID_in_notes = userID_req)) {
      await notesModel.findByIdAndDelete(
        {
          _id: ID,
        },
        payload
      );
      res.send(`data with ${ID} got Delete`);
    } else {
      res.send("Not Authorized");
    }
  } catch (error) {
    res.send(error);
  }
});

module.exports = { notesRouter };
