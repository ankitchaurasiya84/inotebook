const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Notes = require("./../models/Notes");
var fetchuser = require("./../middleware/fectchuser");
//Route 1 Get all the notes using GET: "/api/notes/fetchallnotes" login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    res.status(403).json({ error: "some err occured : unable to fetch notes" });
  }
});

//Route 2 Add a notes using POST: "/api/notes/addnote" login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }), // validator
    body("description", "Enter a valid description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
        const { title, description, tag } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // error handler
    }
    const note = await Notes({
      title,
      description,
      tag,
      user: req.user.id,
    });
    const saveNote = await note.save();
    res.json(saveNote);

    } catch (error) {
        res.status(401).json({ error: "some err occured : unable to add notes" });
    }
    
  }
);

//Route 3 Update a note using POST: "/api/notes/update" login required
router.put(
    "/update/:id",
    fetchuser,async (req, res) => {
      
      let { title, description, tag } = req.body;
      const newNote={}
      if(title){newNote.title=title}
      if(description){newNote.description=description}
      if(tag){newNote.tag=tag}
      let note= await Notes.findById(req.params.id)
      if(!note){ return res.status(404).send("Not Found")}
      if(note.user.toString()!==req.user.id){return res.status(401).send("Not Allowed")}
      
      note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
      res.json({note})
    }

  );


//Route 4 delete a note using POST: "/api/notes/delete" login required
router.delete(
    "/delete/:id",
    fetchuser,async (req, res) => {

      let note= await Notes.findById(req.params.id)
      if(!note){ return res.status(404).send("Not Found")}
      if(note.user.toString()!==req.user.id){return res.status(401).send("Not Allowed")}
      note = await Notes.findByIdAndDelete(req.params.id)
      //note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
      res.json({status:"success",operation:"Deletion",note})
    }

  );


module.exports = router;

