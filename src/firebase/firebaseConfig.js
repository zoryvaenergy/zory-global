// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCX_LRXWMKpIIEle9RCYupqg3i5u2qLhdc",
  authDomain: "zory-global.firebaseapp.com",
  projectId: "zory-global",
  storageBucket: "zory-global.firebasestorage.app",
  messagingSenderId: "347383936276",
  appId: "1:347383936276:web:3c2129da2720ba47befe01",

  databaseURL:
    "https://zory-global-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);

export default app;