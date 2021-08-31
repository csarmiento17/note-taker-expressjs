const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

function getNotes() {
  fs.readFileSync(path.join(__dirname, "../data/db.json")).then(function (
    notes
  ) {
    let myNotes;

    try {
      //myNotes = [].concat(JSON.parse(notes));
      myNotes = JSON.parse(notes);
    } catch (error) {
      console.log(error);
    }
    return myNotes;
  });
}

function createNewNotes(body, notesArray) {
  const note = body;
  notesArray.push({ ...note, id: uuidv4() });
  fs.writeFileSync(
    path.join(__dirname, "../data/db.json"),
    JSON.stringify({ notes: notesArray }, null, 2)
  );
  return note;
}

function saveNotes(data) {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync(path.join(__dirname, "../data/db.json"), stringifyData);
}

function deleteNotes(id) {
  console.log(id);
  // fs.readFileSync(
  //   path.join(__dirname, "../data/db.json"),
  //   "utf8",
  //   (err, data) => {
  //     var existNotes = getNotes();
  //     const noteId = req.params["id"];
  //     delete existNotes[noteId];
  //     createNewNotes(existNotes);
  //     res.send(`Notes with id ${noteId} has been deleted`);
  //   },
  //   true
  // );
  getNotes()
    .then((notes) => notes.filter((note) => note.id !== id))
    .then((newData) => saveNotes(newData));
}

function validateNotes(note) {
  if (!note.text || typeof note.text !== "string") {
    return false;
  }
  if (!note.title || typeof note.title !== "string") {
    return false;
  }

  return true;
}

module.exports = {
  getNotes,
  createNewNotes,
  deleteNotes,
  validateNotes,
};
