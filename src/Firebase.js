import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';

const firebaseApp = firebase.initializeApp ({
    apiKey: "AIzaSyAl8zIIH3XHz_FMelEQ6bYVsAnR5j6ZNFM",
    authDomain: "todo-app-a334b.firebaseapp.com",
    projectId: "todo-app-a334b",
    storageBucket: "todo-app-a334b.appspot.com",
    messagingSenderId: "701789094247",
    appId: "1:701789094247:web:e9764c8a809ee7a256efc2",
    measurementId: "G-J4BY8KGEVH"
})

const db = firebaseApp.firestore();

export default db ;