import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Notes from "./Notes"

export const AddNote = () => {
  const context = useContext(noteContext);
  const {addNote } = context;

  const [note, setNote] = useState({ title:"", description: "", tag: "default" });
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });

  };

  const handleClick = (e) => {
    e.preventDefault()
    addNote(note.title,note.description,note.tag)
    setNote({ title:"", description: "", tag: "" })

  };
  return (
    <div>
      <div className="container my-3">
        <h3>Add a note</h3>
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label"> Title</label>
            <input type="text" className="form-control" id="title" name="title" onChange={onChange} value={note.title} />
           
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">description</label>
            <input type="text"className="form-control" id="description" name="description"  value={note.description}
              onChange={onChange}
            />
            <div className="mb-3">
            <label htmlFor="tag" className="form-label">tag</label>
            <input type="text"className="form-control" id="tag" name="tag"  value ={note.tag}
              onChange={onChange}
            />
            </div>
          </div>
          <button disabled={note.title.length<5 || note.description.length<5}
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Add Note
          </button>
        </form>
      </div>
      <div className="container my-3">
        <h3>your note</h3>
        <Notes />
        
      </div>
    </div>
  );
};
