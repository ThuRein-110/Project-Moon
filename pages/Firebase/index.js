// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAqPO7vGKJ-MA5FssgKLi6jjgj4gCwYV6M",
    authDomain: "remindme-465ab.firebaseapp.com",
    projectId: "remindme-465ab",
    storageBucket: "remindme-465ab.appspot.com",
    messagingSenderId: "818223577462",
    appId: "1:818223577462:web:041f50e8f3773b5845a257",
    measurementId: "G-LN6GD60CYK"
};

// Initialize Firebase
export const firebaseapp = initializeApp(firebaseConfig);
