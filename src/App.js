import './App.css';
import TextField from '@material-ui/core/TextField';
import { Button} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { db } from './firebase_config';
import firebase from "firebase";
import TodoList from './todo';

function App() {
  
  const [toDo, setToDo] = useState("");
  const [data,setData]=useState([]);

  useEffect(() => {
    dispToDo();
  }, [])

  function addToDo(e){
      e.preventDefault();
      db.collection("toDoList").add({
        toDo:toDo,
        time:firebase.firestore.FieldValue.serverTimestamp(),
        completed:false,
      });
      setToDo("");
  }

  
  
  function dispToDo(){  
    db.collection("toDoList").orderBy("time", "asc").onSnapshot(function(query){
    setData(
      query.docs.map((element)=>({
        id:element.id,
        toDo:element.data().toDo,
        completed:element.data().completed,
      }))
    );
    }
    );
  }

  return (
    <div className="App">
      <div className="follow" style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
      <h1>To-Do list</h1>
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
            /></li>
          ))}
          
          </ol>
        </div>
    </div>
    </div>
  );
}

export default App;
