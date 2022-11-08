require("dotenv").config();

const express = require("express");
const database = require("./database");

const app = express();

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});

// 1ere étape de la quête Express 02 - Créer une route GET /api/users
app.get("/api/users", (req, res) => {
  database
    .query("select * from users")
    .then(([users]) => {
      res.json(users);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.status(404).send("Not Found");
    });
});

// 2eme étape de la quête Express 02 - Créer une route GET /api/users/:id
app.get("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  database.query("select * from users where id = ?", [id]).then(([users]) => {
    if (users[0] != null) {
      res.json(users[0]);
    } else {
      res.status(404).send("Not Found");
    }
  });
});
