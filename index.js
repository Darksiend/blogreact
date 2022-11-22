import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { registerValidation } from "./validations/auth.js";
import { validationResult } from "express-validator";
import UserModel from "./models/User.js";
const port = 4444;
const app = express();
mongoose
  .connect(
    "mongodb+srv://darksiend:123@mycluster.eswzs4i.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DB Ok!");
  })
  .catch((e) => console.log("DB Error", e));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());

app.post("auth/login", (req, res) => {
  try {
  } catch (e) {}
});

app.post("/auth/register", registerValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash,
    });

    const user = await doc.save();
    const token = jwt.sign({ _id: user._id }, "secret123", {
      expiresIn: "30d",
    });

    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error" });
  }
});

app.listen(port, (e) => {
  if (e) throw e;
  console.log("port: ", port);
});
