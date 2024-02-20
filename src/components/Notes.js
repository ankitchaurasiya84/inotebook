//import React from 'react'
import React, { useContext, useEffect, useState, useRef } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
//import { AddNote } from "./AddNote";
import { useNavigate } from 'react-router-dom'

export default function Notes(props) {
  let navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes,editNote} = context;
  useEffect(() => {
    if(localStorage.getItem('token'))
    { getNotes(localStorage.getItem('token'))
      console.log("new logger",localStorage.getItem('token'));
    }
   
  else{
  //  navigate("/login")
  }
    //eslint-disable-next-line
  }, []);
  const ref = useRef(null)
  const refClose = useRef(null)
  const [note, setNote] = useState({id:"", etitle: "", edescription: "", etag: "default" });

  const updateNote = (currentNote) => {
    console.log("edit calling",currentNote);
    ref.current.click();
    setNote({id:currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault()
    console.log("update calling", note);
    editNote(note.id,note.etitle,note.edescription,note.etag)
    refClose.current.click();


  };

  return (
    <>

      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal"></button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label"> Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} />

                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription}
                    onChange={onChange}
                  />
                  <div className="mb-3">
                    <label htmlFor="tag" className="form-label">tag</label>
                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag}
                      onChange={onChange}
                    />
                  </div>
                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" onClick={handleClick} className="btn btn-primary">Update Notes</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="container"> 
        {notes.length===0 && "No Notes to display"}
        </div>
        {notes.map((note) => {
          // return console.log(note);
          return <NoteItem key={note._id} updateNote={updateNote} note={note} />;
        })}
      </div>
    </>
  );
}
