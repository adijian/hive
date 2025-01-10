import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'; 

const firebaseConfig = {
    apiKey: "AIzaSyAl6vV3vux2Vwo791wTkFUhJsLLsBIK5gA",
    authDomain: "hive-c08a1.firebaseapp.com",
    projectId: "hive-c08a1",
    storageBucket: "hive-c08a1.firebasestorage.app",
    messagingSenderId: "1091062151815",
    appId: "1:1091062151815:web:baed9fd767cb2aaf609622",
    measurementId: "G-X5MB5B11TY"
  };
  
const dbApp = initializeApp(firebaseConfig)

const db = getFirestore(dbApp)

export { db }