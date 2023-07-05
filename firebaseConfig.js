// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDbgO9G5-OBnZA8_c5hsnNkBTXitJ25uWQ",
    authDomain: "noticiasrndb.firebaseapp.com",
    projectId: "noticiasrndb",
    storageBucket: "noticiasrndb.appspot.com",
    messagingSenderId: "1075103407105",
    appId: "1:1075103407105:web:d1f58ab5c16a3da07ef400"
  };

// Initialize Firebase
//export const app = initializeApp(firebaseConfig);
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIRESTORE_STORAGE = getStorage(FIREBASE_APP);
const analytics = getAnalytics(FIREBASE_APP);
export const auth = getAuth(FIREBASE_APP);