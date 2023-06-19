// Import the functions you need from the SDKs you need
import { doc, getFirestore } from "firebase/firestore";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyByJPyIn8GDfVkGoIvEb3woqQwyGT6exPI",
   authDomain: "fir-tutorial-32b97.firebaseapp.com",
   databaseURL: "https://fir-tutorial-32b97-default-rtdb.asia-southeast1.firebasedatabase.app",
   projectId: "fir-tutorial-32b97",
   storageBucket: "fir-tutorial-32b97.appspot.com",
   messagingSenderId: "603690125689",
   appId: "1:603690125689:web:3612be3be6e3575a6907a8",
   measurementId: "G-872EW90P8N"
 };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
