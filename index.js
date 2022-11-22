import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
const port = 4444;
const app = express();
mongoose
  .connect(
    "mongodb+srv://darksiend:123@mycluster.eswzs4i.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DB Ok!");
  })
  .catch((e) => console.log("DB Error", e));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());

app.post("/auth/register", (req, res) => {});

app.listen(port, (e) => {
  if (e) throw e;
  console.log("port: ", port);
});
