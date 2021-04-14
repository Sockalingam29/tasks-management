import { Button } from '@material-ui/core';
import React from 'react'
import { db } from './firebase_config';

export default function TodoList({ todo, inprogress, id }) {
    
    function progressHandler(){
        db.collection("toDoList").doc(id).update({
            completed:!inprogress
        })
    }

    function deleteHandler(){
        db.collection("toDoList").doc(id).delete();
    }
    
    return (
        <div>
            <div style={{display:"flex", padding:"10px 0px"}}>
            <p style={{border:"1px solid white",margin:"auto",width:"100%"}}>
                <div><strong>{todo}</strong></div>
                <small>{inprogress ? "Done" : "In Progress"}</small>
                
            </p>
            <Button color="primary" style={{margin:"2px"}} onClick={progressHandler} style={{}}>
                {inprogress ? "Undone" : "Done"}
            </Button>
            <Button color="secondary" onClick={deleteHandler} style={{}}>X</Button>
            
        </div>
        <hr></hr>
        </div>
       
    );
}

