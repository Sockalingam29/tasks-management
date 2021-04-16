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
    
      <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
      
        <h1 style={{height:"150px",marginBottom:"1.5rem",border:"1px solid white", borderBottomLeftRadius:"2.5rem",backgroundColor:"#ededf0",display:"flex",width:"100%",alignItems:"center",justifyContent:"center"}}>
        <div style={{margin:"auto",paddingTop:"20px",paddingLeft:"20px",font:"50px bold"}}>To-Do list</div>
        <div style={{marginRight:"20px"}}><Button onClick={logoutHandler}>Logout</Button></div>
        </h1>
        
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
        <footer class="footer" style={{marginTop:"1.5rem",display:"flex",flexDirection:"column",width:"100%",backgroundColor:"#ededf0",borderTopRightRadius:"2.5rem",border:"1px solid white",color:"black",alignItems:"center",justifyContent:"center"}}>
        <div class="footer-header" style={{padding:"1.5rem"}}>Made by Sockalingam</div>
        <div style={{padding:"0rem"}}>Connect with me:</div>
        <ul class="list-non-bullet" style={{padding:"1.5rem"}}>
            <li class="list-item-inline"><a class="link" href="https://github.com/Sockalingam29">Github</a></li>
            <li class="list-item-inline"><a class="link" href="https://instagram.com/sockalingam_a">Instagram</a></li>
            <li class="list-item-inline"><a class="link" href="https://www.linkedin.com/in/sockalingam-a-20ab7b1b6">LinkedIn</a></li>

        </ul>
    </footer>
        </div>
      </div>
    )

  }
