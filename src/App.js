import './App.css';
import firebase from "firebase";
import AppPage from "./appPage";
import { useState } from 'react';

function App() {
  const[login,setLogin]=useState("");
  
  function loginHandler(){
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
    .signInWithPopup(provider)
    .then((result) => { 
      var credential = result.credential;
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }) 
    .catch((error) => {
      console.log(error);
    });
  }
  
  const Login=()=>(
    <div><h1>Ready to login?</h1>
    <button onClick={loginHandler}>Login with Google</button>
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
