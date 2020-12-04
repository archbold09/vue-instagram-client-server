const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "vue-instagram-clone",
});

const protectedRoute = (req, res, next) => {
  const token = req.headers["auth"];
  if (!token) return res.status(401).json({ message: "Auth error" });

  jwt.verify(token, "llavesecreta", (error, decoded) => {
    if (error) return res.status(401).json({ message: "Auth error" });
    req.decoded = decoded;
    next();
  });
};
app.set("port", process.send.PORT || 3000);
app.use(cors());
app.use(express.json());

app.post("/api/users/login", (req, res) => {
    connection.query(
      `SELECT email, password FROM users WHERE email = '${req.body.email}'`,
      (error, result) => {
        if (error) throw error;

        if (!result[0]) {
          res.json({ error: "user not found" });
        }
        
        bcrypt.compare(req.body.password, result[0].password, (error, ok) => {
          if (!ok) {
            res.json({ error: "password error" });
          }

          let userData = {
            id: result[0].id,
          };

          jwt.sign(
            userData,
            "secretkey",
            { expiresIn: 60 * 60 * 1 },
            (error, token) => {
              if (error) throw error;
              return res.json({ token: token });
            }
          );
        });
      }
    );
});

app.post("/api/users/register", (req, res) => {
  bcrypt.hash(req.body.password, 10, (error, password) => {
    connection.query(
      `INSERT INTO users (email, password) VALUES ('${req.body.email}', '${password}')`,
      (result) => {
        let userData = {
          email: req.body.email,
        };
        jwt.sign(
          userData,
          "secretkey",
          { expiresIn: 60 * 60 * 1 },
          (error, token) => {
            if (error) throw error;
            res.json({ token: token });
          }
        );
      }
    );
  });
});

app.get("/api/users/profile", protectedRoute, (req, res) => {
  res.json({
    email: "angelarchbold",
  });
});

app.listen(app.get("port"), () => {
  console.log(`Server is running: http://localhost:${app.get("port")}`);
});
