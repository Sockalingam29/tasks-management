import React from 'react'
import TodoList from "./todo"
import TextField from '@material-ui/core/TextField';
import { Button} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { db } from './firebase_config';
import firebase from "firebase";

export default function AppPage() { 
  const [toDo, setToDo] = useState("");
  const [data,setData]=useState([]);

useEffect(() => {
  dispToDo();
}, [toDo])

function addToDo(e){
    e.preventDefault();
    db.collection(`${firebase.auth().currentUser.email}`).add({
      toDo:toDo,
      time:firebase.firestore.FieldValue.serverTimestamp(),
      completed:false,
    });
    setToDo("");
}


function dispToDo(){  
  db.collection(`${firebase.auth().currentUser.email}`).orderBy("time", "asc").onSnapshot(function(query){
  setData(
    query.docs.map((element)=>({
      id:element.id,
      toDo:element.data().toDo,
      completed:element.data().completed,
    }
  ))
  );
  }
  );
}

function logoutHandler(){
    firebase.auth().signOut()
    .catch((error) => {
        // An error happened.
        console.log(error);
      });
}



  return (
      <div>
      <div className="follow" style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
      
        <h1 style={{display:"flex",width:"100%",alignItems:"center",justifyContent:"center"}}>
        <div style={{margin:"auto",paddingLeft:"20px",font:"50px bold"}}>To-Do list</div>
        <div style={{marginRight:"20px"}}><button onClick={logoutHandler}>Logout</button></div>
        </h1>
        <img src="images/img.svg"></img>
      <form style={{display:"flex"}}>
        <TextField style={{paddingRight:"10px",width:"600px"}} id="standard-basic" onChange={
          (e)=>setToDo(e.target.value)} label="Add items to your list" value={toDo} />
        <Button type="submit" onClick={addToDo} variant="contained" >Add</Button>
      </form>
      
      <div style={{ width: "90vw", maxWidth: "600px", marginTop: "24px" }}>
          {data.map((todo) => (
            <TodoList
              todo={todo.toDo}
              inprogress={todo.completed}
              id={todo.id}
            />
            
          ))}
          
          
        </div>
        </div>
      </div>
    )

  }
