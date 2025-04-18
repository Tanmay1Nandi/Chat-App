// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "chat-app-ddcd7.firebaseapp.com",
  projectId: "chat-app-ddcd7",
  storageBucket: "chat-app-ddcd7.firebasestorage.app",
  messagingSenderId: "44569301199",
  appId: "1:44569301199:web:39d4abc98e98cc7180a7ba"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);