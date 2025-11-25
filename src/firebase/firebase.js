// firebase/firebase.js
// Initializes Firebase + exports Auth & Firestore instances

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCABbsTYyGDIpss0qvVJnLqJf1orb9qNMQ",
  authDomain: "ai-quiz-app-4bdc7.firebaseapp.com",
  projectId: "ai-quiz-app-4bdc7",
  storageBucket: "ai-quiz-app-4bdc7.firebasestorage.app",
  messagingSenderId: "356790560508",
  appId: "1:356790560508:web:137eda41f608c1faff1979",
  measurementId: "G-924NRWR9FJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase Auth + Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
