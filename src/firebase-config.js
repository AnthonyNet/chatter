// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpIGGGq0DA4w48lmn-fTGtr4gKB27bTRs",
  authDomain: "chat-enty.firebaseapp.com",
  projectId: "chat-enty",
  storageBucket: "chat-enty.appspot.com",
  messagingSenderId: "331546076031",
  appId: "1:331546076031:web:7524958bf24889a6f5704a",
  measurementId: "G-R5MQREXJBY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();