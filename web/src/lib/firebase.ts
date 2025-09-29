// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMW3O02nfBUxUjVheSbd7AI7Ay4ITj9LE",
  authDomain: "byte-back-97254.firebaseapp.com",
  projectId: "byte-back-97254",
  storageBucket: "byte-back-97254.firebasestorage.app",
  messagingSenderId: "403026629801",
  appId: "1:403026629801:web:1a54393d4c1831059885b8",
  measurementId: "G-PXDDR1E6CH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
