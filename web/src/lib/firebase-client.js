"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.app = void 0;
const app_1 = require("firebase/app");
const lite_1 = require("firebase/firestore/lite");
const firebaseConfig = {
    apiKey: "AIzaSyBMW3O02nfBUxUjVheSbd7AI7Ay4ITj9LE",
    authDomain: "byte-back-97254.firebaseapp.com",
    projectId: "byte-back-97254",
    storageBucket: "byte-back-97254.firebasestorage.app",
    messagingSenderId: "403026629801",
    appId: "1:403026629801:web:1a54393d4c1831059885b8",
    measurementId: "G-PXDDR1E6CH",
};
const app = (0, app_1.initializeApp)(firebaseConfig);
exports.app = app;
const db = (0, lite_1.getFirestore)(app);
exports.db = db;
//# sourceMappingURL=firebase-client.js.map