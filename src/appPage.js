import React from 'react'
import TodoList from "./todo"
import TextField from '@material-ui/core/TextField';
import { Button} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { db } from './firebase_config';
import firebase from "firebase";
import { auth } from 'firebaseui';


export default function AppPage() { const [toDo, setToDo] = useState("");
const [data,setData]=useState([]);
 var userName;

 {firebase.auth().onAuthStateChanged(function(user) {
  userName=user.email;
  console.log(userName);
 });}

useEffect(() => {
  dispToDo();
}, [])

function addToDo(e){
    e.preventDefault();
    db.collection(`${firebase.auth().currentUser.email}`).add({
      toDo:toDo,
      time:firebase.firestore.FieldValue.serverTimestamp(),
      completed:false,
      user:userName,
    });
    setToDo("");
}


function dispToDo(){  
  db.collection(`${firebase.auth().currentUser.email}`).orderBy("time", "asc").onSnapshot(function(query){
  setData(
    query.docs.map((element)=>({
      //element.data().user === userName ?
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
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
}



    return (
        <div>
            <div className="follow" style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
      <h1>To-Do list</h1>
      <button onClick={logoutHandler}>Logout</button>
      <form style={{display:"flex"}}>
        <TextField style={{paddingRight:"10px",width:"600px"}} id="standard-basic" onChange={
          (e)=>setToDo(e.target.value)} label="Add items to your list" value={toDo} />
        <Button type="submit" onClick={addToDo} variant="contained" >Add</Button>
      </form>
      
      <div style={{ width: "90vw", maxWidth: "600px", marginTop: "24px" }}>
          <ol>{data.map((todo) => (
            <li><TodoList
              todo={todo.toDo}
              inprogress={todo.completed}
              id={todo.id}
              user={todo.user}
            /></li>
            
          ))}
          
          </ol>
        </div>
    </div>
        </div>
    )

  }
