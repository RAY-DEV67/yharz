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
    apiKey: "AIzaSyA29NrLMJPZPmWap4bSoNzjlY9ZL4RqMEI",
    authDomain: "cadmus-c5183.firebaseapp.com",
    projectId: "cadmus-c5183",
    storageBucket: "cadmus-c5183.appspot.com",
    messagingSenderId: "683899945683",
    appId: "1:683899945683:web:e3e798e8c4f7c6ff5e4a26",
    measurementId: "G-114YB2PYHS"
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

