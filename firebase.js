// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbKNI33mf3zitVOC_aMMBOi3k7JOId1ps",
  authDomain: "insta-2-yt-9fccd.firebaseapp.com",
  projectId: "insta-2-yt-9fccd",
  storageBucket: "insta-2-yt-9fccd.appspot.com",
  messagingSenderId: "988455789473",
  appId: "1:988455789473:web:8e48246310aa497b01e1e0",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
