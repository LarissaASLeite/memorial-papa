// ─────────────────────────────────────────────────────────────────────────────
// Firebase initialization
// Replace the placeholder values below with your actual Firebase project config.
// You can find these in: Firebase Console → Project Settings → General → Your apps
// ─────────────────────────────────────────────────────────────────────────────
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDQSmrBRADq6zFkPZ_iVr6vGAzRhDI37XM",
  authDomain: "memorial-papa.firebaseapp.com",
  projectId: "memorial-papa",
  storageBucket: "memorial-papa.firebasestorage.app",
  messagingSenderId: "211030891356",
  appId: "1:211030891356:web:a7bcd884d617ab1a2c7f99",
  measurementId: "G-SDGFEP5CZG"
};

// Prevent re-initialization on Next.js hot reload
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const auth = getAuth(app);
