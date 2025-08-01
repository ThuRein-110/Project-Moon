import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB5cmqd1bTJeeJEcE2y23BK2wecjedWni8",
  authDomain: "portfolio-aabd7.firebaseapp.com",
  databaseURL: "https://portfolio-aabd7-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "portfolio-aabd7",
  storageBucket: "portfolio-aabd7.firebasestorage.app",
  messagingSenderId: "995755404255",
  appId: "1:995755404255:web:80e89cc88246b0abdef26a",
  measurementId: "G-9QSJ3TH813"
};

// Initialize Firebase only if it hasn't been initialized yet
export const firebaseapp = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApps()[0];