// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDmKeY30rOvsll_662uMokyW4HDDMxMXDA",
  authDomain: "chicken69.firebaseapp.com",
  projectId: "chicken69",
  storageBucket: "chicken69.appspot.com",
  messagingSenderId: "144962953249",
  appId: "1:144962953249:web:5de75cd3c526f9ab054360"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;

