// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "notion-clone-586cc.firebaseapp.com",
  projectId: "notion-clone-586cc",
  storageBucket: "notion-clone-586cc.firebasestorage.app",
  messagingSenderId: "446968018376",
  appId: "1:446968018376:web:cd1dc16046feb95715fcfd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);