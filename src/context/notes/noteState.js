import React, { useState } from "react"
import NoteContext from "./noteContext"

const NoteState =(props)=>{
    const host= "http://localhost:5001"
    const notesInitials=[]
    const [notes,setNotes]=useState(notesInitials)


    const getNotes=async (token)=>{
        //todo: Api call
         // API calls
         const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET", 
            headers: {
              "Content-Type": "application/json",
              "authToken":localStorage.getItem('token')
            },
            
          });
           const json= await response.json()
        console.log(json);
        console.log("calling fetch note");
        setNotes(json)
       
    }


    //add a note
    const addNote=async (title,description,tag)=>{
        //todo: Api call
         // API calls
         const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
              "authToken":localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag}), 
          });
        const note= await response.json(); 
        setNotes(notes.concat(note))
        console.log("calling add note");
        
           
       
        //concat return array where push updates an array
    }
     //delete a note
    const deleteNote= async (id)=>{
      //TODO api calls
      const response = await fetch(`${host}/api/notes/delete/${id}`, {
        method: "DELETE", 
        headers: {
          "Content-Type": "application/json",
          "authToken":localStorage.getItem('token')
        },
       
      });

      const json= response.json(); 
        console.log("Delete calling"+id);
       const  newNotes = notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes)
    }
    // edit a note
     const editNote= async (id,title,description,tag)=>{
        // API calls
        const response = await fetch(`${host}/api/notes/update/${id}`, {
            method: "PUT", 
            headers: {
              "Content-Type": "application/json",
              "authToken":localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag}), 
          });
          const json= response.json(); 
        let EnewNotes= JSON.parse(JSON.stringify(notes))

        //logic to edit client
        for (let index = 0; index < EnewNotes.length; index++) {
            const element = EnewNotes[index];
                if(element._id===id){
                  EnewNotes[index].title=title;
                  EnewNotes[index].description=description;
                  EnewNotes[index].tag=tag;
                    break; 
                }
               
        }  
        setNotes(EnewNotes)
            
     }
    return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
        {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState