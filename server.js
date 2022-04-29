const express = require("express");
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "movie_db",
  },
  console.log("coneccted to movie db")
);

app.get("/api/movies", (req, res) => {
  db.query("SELECT * FROM movies", (err, result) => {
    err ? console.log(err) : res.json(result);
  });
});

app.post("/api/add-movie", (req, res) => {
  const movieTitle = req.body.movieTitle;
  db.query(
    `INSERT INTO movies (movie_name) 
    VALUES (?)`,
    movieTitle,
    (err, result) => {
      if (err) {
        res.status(500);
      } else {
        res.send(`${movieTitle} added to db`);
      }
    }
  );
});

app.listen(PORT, () => {
  console.log("server running ");
});
