import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

console.log('🔥 [Firebase] Initializing Firebase configuration...');

const firebaseConfig = {
  apiKey: "AIzaSyBMW3O02nfBUxUjVheSbd7AI7Ay4ITj9LE",
  authDomain: "byte-back-97254.firebaseapp.com",
  projectId: "byte-back-97254",
  storageBucket: "byte-back-97254.firebasestorage.app",
  messagingSenderId: "403026629801",
  appId: "1:403026629801:web:1a54393d4c1831059885b8",
  measurementId: "G-PXDDR1E6CH",
};

console.log('🔥 [Firebase] Config loaded for project:', firebaseConfig.projectId);

let app: any;
let db: any;

try {
  app = initializeApp(firebaseConfig);
  console.log('✅ [Firebase] App initialized successfully');
  
  db = getFirestore(app);
  console.log('✅ [Firebase] Firestore instance created successfully');
  
} catch (error) {
  console.error('❌ [Firebase] Failed to initialize Firebase:');
  console.error('Error details:', error);
  throw error;
}

export { app, db };
