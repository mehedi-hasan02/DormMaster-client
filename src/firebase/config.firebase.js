// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const all = import.meta.env

const firebaseConfig = {
  apiKey: all.VITE_APIKEY,
  authDomain:all.VITE_AUTHDOMAIN,
  projectId: all.VITE_PROJECTID,
  storageBucket: all.VITE_STORAGEBUCKET,
  messagingSenderId: all.VITE_MESSAGINGSENDERID,
  appId:all.VITE_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;