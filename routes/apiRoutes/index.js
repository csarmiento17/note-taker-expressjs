const router = require("express").Router();
const { notes } = require("../../data/db");

router.get("/notes", (req, res) => {
  let results = notes;
  if (notes) {
    res.json(results);
    console.log(results);
  }
});

module.exports = router;
