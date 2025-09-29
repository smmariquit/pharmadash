import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyBMW3O02nfBUxUjVheSbd7AI7Ay4ITj9LE",
  authDomain: "byte-back-97254.firebaseapp.com",
  projectId: "byte-back-97254",
  storageBucket: "byte-back-97254.firebasestorage.app",
  messagingSenderId: "403026629801",
  appId: "1:403026629801:web:1a54393d4c1831059885b8",
  measurementId: "G-PXDDR1E6CH",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
