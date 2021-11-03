const express = require("express");
const fs = require("fs");
const path = require("path");
const { addNote } = require("./db/store");
const store = require("./db/store");

//setup express app
const app = express();
const PORT = process.env.PORT || 3001;

//handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// html routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.post("/api/notes", (req, res) => {
  store
    .addNote(req.body)
    .then((note) => res.json(note))
    .catch((err) => res.status(500).json(err));
});

app.get("/api/notes", (req, res) => {
  store
    .getNotes()
    .then((notes) => {
      return res.json(notes);
    })
    .catch((err) => res.status(500).json(err));
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
