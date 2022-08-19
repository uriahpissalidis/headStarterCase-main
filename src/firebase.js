// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3qbqmutpmwwVSqKbZtA1XvckgjLpX6IU",
  authDomain: "headstartergroup.firebaseapp.com",
  databaseURL: "https://headstartergroup-default-rtdb.firebaseio.com",
  projectId: "headstartergroup",
  storageBucket: "headstartergroup.appspot.com",
  messagingSenderId: "145286482610",
  appId: "1:145286482610:web:dfa3f2bbb152171a8fd7ab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);