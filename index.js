import express from "express";
import jwt from "jsonwebtoken";
const port = 4444;
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());

app.post("/auth/login", (req, res) => {
  console.log(req.body);
  res.json({ success: true });
});

app.listen(port, (e) => {
  if (e) throw e;
  console.log("port: ", port);
});
