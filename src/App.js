import './App.css';
import firebase from "firebase";
import AppPage from "./appPage";
import { useState } from 'react';
import { Button } from '@material-ui/core';

function App() {
  const[login,setLogin]=useState("");
  
  function loginHandler(){
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
    .signInWithPopup(provider)
    .then((result) => { 
      //var credential = result.credential;
      // This gives you a Google Access Token. You can use it to access the Google API.
      //var token = credential.accessToken;
      // The signed-in user info.
      //var user = result.user;
      // ...
    }) 
    
    .catch((error) => {
      console.log(error);
    });
  }
  
  const Login=()=>(
    <div style={{display:"flex",alignItems:"center",flexDirection:"column",justifyContent:"center",height:"100%",margin:"100px"}}>
      <h1 style={{font:"50px bold"}}>
        <div>The To-Do App</div>
        <img src="src/images/img.svg"/>
        <div>Ready to login?</div></h1>
    <Button variant="contained" onClick={loginHandler}>Login with your Google acccount</Button>
    </div>
  )

  {firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      setLogin("1");
    } else {
      setLogin("2")
    }
  })}
 
  return (
    <div className="App">
      {login === "1" ? <AppPage/> : <Login/>}
    </div>
  );
}
export default App;
