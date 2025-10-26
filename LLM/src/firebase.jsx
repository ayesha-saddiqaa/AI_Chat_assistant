// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBi77CSDce-7wHf5BSwmns7bAJEcTEwR8Y",
  authDomain: "llm-ui-2fd7f.firebaseapp.com",
  projectId: "llm-ui-2fd7f",
  storageBucket: "llm-ui-2fd7f.firebasestorage.app",
  messagingSenderId: "413176663601",
  appId: "1:413176663601:web:c75ba78fc8aa779cb54f10",
  measurementId: "G-L990TQGRGG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);