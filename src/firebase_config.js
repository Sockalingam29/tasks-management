import firebase from "firebase";
var firebaseConfig = {
    apiKey: "AIzaSyCt_ZXHnglBy_h9X2llTJu3Vge5hAMFimc",
    authDomain: "to-do-app-3d745.firebaseapp.com",
    projectId: "to-do-app-3d745",
    storageBucket: "to-do-app-3d745.appspot.com",
    messagingSenderId: "819365061808",
    appId: "1:819365061808:web:f99d4db4617ed820d58775"
  };
  
firebase.initializeApp(firebaseConfig);
const db=firebase.firestore();
export {db};

  