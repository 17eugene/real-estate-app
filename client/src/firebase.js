import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "real-estate-584a2.firebaseapp.com",
  projectId: "real-estate-584a2",
  storageBucket: "real-estate-584a2.appspot.com",
  messagingSenderId: "498951219747",
  appId: "1:498951219747:web:652199758e3390a5d45f96",
};

export const app = initializeApp(firebaseConfig);
