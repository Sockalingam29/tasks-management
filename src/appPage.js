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
      <div style={{background:"aliceblue",minHeight:"100vh"}}>
       
        <div style={{height:"140px",marginBottom:"1.5rem", 
                  backgroundColor:"#303F9F",color:"white",display:"flex",width:"100%",alignItems:"center",justifyContent:"center"}}>
        <div style={{margin:"auto",paddingTop:"20px",paddingLeft:"20px",fontSize:"50px",fontWeight:"bolder",fontFamily: "Graphik Web,Helvetica Neue,Helvetica,Arial,sans-serif"}}>TASKS</div>
        <div style={{marginRight:"20px"}}><Button variant="contained" onClick={logoutHandler}>Logout</Button></div>
        </div>

      <div style={{display:"flex", flexDirection:"column", alignItems:"center",marginTop:"48px"}}>
        <form style={{display:"flex",maxWidth:"100%"}}>
        <TextField style={{paddingRight:"10px",width:"60vw",maxWidth:"600px"}} id="standard-basic" onChange={
          (e)=>setToDo(e.target.value)} label="Add items to your list" value={toDo} />
        <Button type="submit" style={{padding:"10px 30px"}} onClick={addToDo} variant="contained" color="primary" >Add</Button>
      </form>
     
      
      <div style={{minHeight:"100%", width: "90vw", maxWidth: "600px", marginTop: "24px" }}>
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
