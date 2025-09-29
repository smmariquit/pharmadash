"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import the functions you need from the SDKs you need
const app_1 = require("firebase/app");
const analytics_1 = require("firebase/analytics");
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
const app = (0, app_1.initializeApp)(firebaseConfig);
const analytics = (0, analytics_1.getAnalytics)(app);
//# sourceMappingURL=firebase.js.map