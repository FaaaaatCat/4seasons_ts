// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmTzt9qcJ7bQtNr3EFqjhkWIEYPuXVTAs",
  authDomain: "seasons-71566.firebaseapp.com",
  projectId: "seasons-71566",
  storageBucket: "seasons-71566.appspot.com",
  messagingSenderId: "152225361327",
  appId: "1:152225361327:web:d72222cfdfcd57e3f8d35a",
  measurementId: "G-XQM87EHZZS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);

export const storage = getStorage(app);
export const dbService = getFirestore(app);