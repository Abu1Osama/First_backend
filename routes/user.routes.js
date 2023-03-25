const express = require("express");
const userRouter = express.Router();
const { userModel } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config()

userRouter.get("/", (req, res) => {
  res.send("/register,/login now");
});

userRouter.post("/register", async (req, res) => {
  const { email, password, location, age } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      const user = new userModel({ email, password: hash, location, age });
      await user.save();
      res.status(200).send({ msg: "Registration successfull" });
      // Store hash in your password DB.
    });

    // const user = new userModel(req.body);
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // if (user.length > 0) {
    //   res.status(200).send({ msg: "login successfull" });
    // } else {
    //   res.status(400).send("wrong credential");
    // }

    // user.length > 0
    //   ? res.status(200).send({ msg: "login successfull","token":jwt.sign({name:"batman"},'bruce') })
    //   : res.status(400).send("wrong credential");
    const user = await userModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          res.status(200).send({
            msg: "login successfull",
            token: jwt.sign({ userID: user._id }, process.env.secret_code),
          });
        } else {
          res.status(400).send("wrong credential");
        }
      });
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

userRouter.get("/details", (req, res) => {
  const token = req.headers.authorization;
  jwt.verify(token, "masai", (err, decode) => {
    decode
      ? res.status(200).send("user details")
      : res.status(400).send({ msg: err.message });
  });
  res.send("/register,/login now");
});

module.exports = { userRouter };
