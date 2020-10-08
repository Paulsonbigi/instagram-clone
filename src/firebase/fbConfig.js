import firebase from "firebase"


  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDYhuLhHMX9wBaVGRZiEGCgeFR0HMFT1wY",
    authDomain: "paul-react-instagram.firebaseapp.com",
    databaseURL: "https://paul-react-instagram.firebaseio.com",
    projectId: "paul-react-instagram",
    storageBucket: "paul-react-instagram.appspot.com",
    messagingSenderId: "939993072376",
    appId: "1:939993072376:web:d508de1cadd54651ef710d"
  })


  const db = firebase.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export { db, auth, storage};

  