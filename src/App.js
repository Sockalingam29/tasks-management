import './App.css';
import firebase from "firebase";
import AppPage from "./appPage";
import { useState } from 'react';
import { Button } from '@material-ui/core';
import background from './background.svg'

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
    <div className="grid-container">
     <div className="grid-img"> <img src={background}/> </div>
    
     <div style={{display:"flex",alignItems:"center",justifyContent:"center", flexDirection:"column"}}>
      <div style={{textAlign:"center"}}>
        <div style={{fontSize:"52px",fontWeight:"bolder",margin:"10px 0px"}}>Organise your day!</div>
        <div style={{fontSize:"24px",margin:"10px 0px"}}>The go-to task managment app</div>
        <Button style={{margin:"10px 0px",padding:"15px 25px"}} variant="contained" color="primary" onClick={loginHandler}>Get in with Google</Button>
      </div>
      <div>
        <h3>Why should you use?</h3>
        <ul>
          <li>With only your Google account, access your tasks on all your devices.</li>
          <li>Seemless and super-fast</li>
          <li>Only your email id collected.</li>
        </ul>
      </div>
    </div> 
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
