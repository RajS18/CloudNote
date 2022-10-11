const express = require("express");
const router = express.Router();
const Note = require("../models/Notes.js");
var fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator"); //validation

//Get all the notes of a user GET "/api/notes/fetchAllNotes" login required
router.get("/fetchAllNotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ err: "Internal error. Try again later." });
    console.log(error.message);
  }
});
//Add a note of a user POST "/api/notes/Addnote" login required
router.post(
  "/addNote",
  fetchUser,
  [
    body("title", "Enter a title with minimum length of 3").isLength({
      min: 5
    }),
    body(
      "description",
      "Create a desription with minimum length of 6"
    ).isLength({
      min: 2
    })
  ],
  async (req, res) => {
    
    try {
      const { title, description, tag } = req.body;
      //console.log(req.body);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      }
      console.log(req.user.id);
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id
      });
      const savedNote = await note.save();
      res.send(savedNote);
    } catch (error) {
      res.status(500).json({ err: "Internal error. Try again later beta." });
      console.log(error.message);
    }
  }
);
//Update a note of a specific user PUT "/api/notes/updateNote" login required
router.put("/updateNote/:id", fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;
  const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }
  //Find the note to be updated;

  let note = await Note.findById(req.params.id);
  if (!note) {
    res.status(404).send("Not found.");
  }
  if (note.user.toString() !== req.user.id) {
    res.status(401).send("Not allowed.");
  }
  note = await Note.findByIdAndUpdate(
    req.params.id,
    { $set: newNote },
    { new: true }
  );
  res.json({ note });
});
//Delete a note of a specific user PUT "/api/notes/deleteNote" login required
router.delete("/deleteNote/:id", fetchUser, async (req, res) => {
  //Find the note to be deleted;
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404).send("Not found.");
    }
    //authenticate user
    if (note.user.toString() !== req.user.id) {
      res.status(401).send("Not allowed.");
    }
    note = await Note.findByIdAndDelete(req.params.id);
    console.log("Note is deleted");
    res.json({ success: "Note has been deleted" });
  } catch (error) {
    res.status(500).json({ err: "Internal error. Try again later." });
    console.log(error.message);
  }
});

module.exports = router;
