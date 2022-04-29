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
  console.log("Connected to movie_db")
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

app.post("/api/update-review", (req, res) => {
  // const newReview = req.body.review;
  // const movie = req.body.movieID
  const { movie_id, review } = req.body;
  db.query(
    `INSERT INTO reviews (movie_id, review)
    VALUES (?, ?)`,
    [movie_id, review],
    (err, result) => {
      if (err) {
        res.status(500);
      } else {
        res.send(`review added for movieID ${movie_id}`);
      }
    }
  );
});

app.delete("/api/movie/:id", (req, res) => {
  const id = req.params.id;
  db.query(`DELETE FROM movies WHERE id = ?`, id, (err, result) => {
    if (err) {
      res.status(500);
    } else {
      res.send(`movie with id ${id} deleted`);
    }
  });
});

app.listen(PORT, () => {
  console.log("server running ");
});
