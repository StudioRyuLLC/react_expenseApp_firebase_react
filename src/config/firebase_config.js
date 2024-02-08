// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJXzrj_hexoXhr5VWLqzoi9_eFj6vYAAw",
  authDomain: "reactexpenseapp-8fb2a.firebaseapp.com",
  projectId: "reactexpenseapp-8fb2a",
  storageBucket: "reactexpenseapp-8fb2a.appspot.com",
  messagingSenderId: "835698041913",
  appId: "1:835698041913:web:46f5cda0ff248476d859e8",
  measurementId: "G-PSFHHN7G39"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth  = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = new getFirestore(app);

/*
$ firebase login
$ firebase init
$ firebase deploy
*/
