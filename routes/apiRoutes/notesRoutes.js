const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const { notes } = require("../../data/db.json");
const { validateNotes, createNewNotes, getNotes } = require("../../lib/notes");

router.get("/notes", (req, res) => {
  //let notes = fs.readFileSync(path.join(__dirname, "../../data/db.json"));
  let results = notes;

  res.json(results);
});

router.post("/notes", (req, res) => {
  //let notes = fs.readFileSync(path.join(__dirname, "../../data/db.json"));

  if (!validateNotes(req.body)) {
    res.status(400).send("The notes is not properly formatted.");
  } else {
    const note = createNewNotes(req.body, notes);
    res.json(note);
  }
});

module.exports = router;
