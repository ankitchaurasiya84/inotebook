import React,{useContext} from 'react'
import Alert from './Alert'
import noteContext from "../context/notes/noteContext";
function NoteItem(props) {
  const context = useContext(noteContext);
  const { notes } = context;
  let { deleteNote } = context;
  let {note,updateNote}=props
  return (
      <div className="col-md-3">
       <div className="card my-3" >
            <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description}</p>
            <span className="material-symbols-outlined mx-2" onClick={()=>{ deleteNote (note._id)}}>delete</span>
            <span className="material-symbols-outlined mx-2" onClick={()=>updateNote(note)}>edit</span>
            
         </div>
    </div>
  </div>


  )

}
export default NoteItem