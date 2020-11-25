const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json());
app.post("/api/users/login", (req, res) => {
  let userData = {
    email: req.body.email,
  };
  bcrypt.hash(req.body.password, 10, (error, hash) => {
    res.send(hash);
  });
});

app.post("/api/users/register", (req, res) => {
  let userData = {
    email: req.body.email,
  };
  bcrypt.hash(req.body.password, 10, (error, hash) => {
    res.send(hash);
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running ${port}`);
});
