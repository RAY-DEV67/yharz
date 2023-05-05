import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import {getFirestore} from "firebase/firestore"

// NEW CONFIG ////////////////////////////

import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/storage"



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Your web app's Firebase configuration
const firebaseApp = firebase.initializeApp( {
  apiKey: "AIzaSyBO-p6xRMu4pZw6hXmLJQ2p5sQAO8YhLKQ",
  authDomain: "yharz-5a318.firebaseapp.com",
  projectId: "yharz-5a318",
  storageBucket: "yharz-5a318.appspot.com",
  messagingSenderId: "793296875857",
  appId: "1:793296875857:web:f248c0959f40b2dd3ce370",
  measurementId: "G-HG503BCZBG"
});

// Initialize Firebase
const app = firebaseApp;

const db = firebaseApp.firestore()

// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
// export const db = getFirestore(app)
export const storage = firebase.storage()
export default db

