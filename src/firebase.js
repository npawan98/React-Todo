import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBXnW_SR6j7MDbKIAGAtY4S0hRd_lRbCxY",
    authDomain: "todo-9f80c.firebaseapp.com",
    databaseURL: "https://todo-9f80c.firebaseio.com",
    projectId: "todo-9f80c",
    storageBucket: "todo-9f80c.appspot.com",
    messagingSenderId: "749089303544",
    appId: "1:749089303544:web:664193693e11461965440d",
    measurementId: "G-1W88ZD4V8B"
});

const db = firebaseApp.firestore();
export default db; // or we can use as below
//export default db;