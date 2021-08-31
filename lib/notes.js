const fs = require("fs");
const path = require("path");

// router.get("/notes", (req, res) => {
//   let rawdata = fs.readFileSync(path.join(__dirname, "../data/db.json"));
//   let notes = JSON.parse(rawdata);
//   console.log(notes);
//   res.json(notes);
// });
function getNotes() {
  let getNote = fs.readFileSync(path.join(__dirname, "../data/notes.json"));
  return getNote;
}

function createNewNotes(body, notesArray) {
  const note = body;
  notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, "../data/db.json"),
    JSON.stringify({ notes: notesArray }, null, 2)
  );
  return note;
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
// function addNotes(body, notes) {
//   const note = body;
//   notes.push(note);
//   fs.writeFileSync(
//     path.join(__dirname, "../data/notes.json"),
//     JSON.stringify({ notes }, null, 2)
//   );
//   return notes;
// }
module.exports = {
  getNotes,
  createNewNotes,
  validateNotes,
};
