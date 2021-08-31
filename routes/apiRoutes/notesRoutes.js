const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const { notes } = require("../../data/db.json");
const {
  validateNotes,
  createNewNotes,
  deleteNotes,
} = require("../../lib/notes");

router.get("/notes", (req, res) => {
  let results = notes;

  return res.json(results);
});

router.post("/notes", (req, res) => {
  if (!validateNotes(req.body)) {
    res.status(400).send("The notes is not properly formatted.");
  } else {
    const note = createNewNotes(req.body, notes);
    return res.json(note);
  }
});

router.delete("/notes/:id", (req, res) => {
  console.log("Routes ", req.params.id);
  deleteNotes(req.params.id).then(() => res.json());
});

module.exports = router;
