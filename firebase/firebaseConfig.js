import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBDKPc5je3F-JdVaaWXzue1BzACn4AUNew",
  authDomain: "smartshoot-b48e2.firebaseapp.com",
  projectId: "smartshoot-b48e2",
  storageBucket: "smartshoot-b48e2.appspot.com",  // Fixed typo here
  messagingSenderId: "37447656123",
  appId: "1:37447656123:web:589d389006b5dabc363f9e",
};

// 🔥 Prevent duplicate initialization
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
