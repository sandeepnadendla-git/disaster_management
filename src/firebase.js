
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/analytics'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZeCU564x1jMgLekw14qsE1ItogEBH7fs",
  authDomain: "cert-db.firebaseapp.com",
  databaseURL: "https://cert-db-default-rtdb.firebaseio.com",
  projectId: "cert-db",
  storageBucket: "cert-db.appspot.com",
  messagingSenderId: "1074017436504",
  appId: "1:1074017436504:web:911fc47ecbd5c20e7e9b2d",
  measurementId: "G-TMQ71YQP4D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getFirestore(app);



export {analytics}