// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgr0h2OSaw_ids2ZBC4AnqyF9sbK1Avyk",
  authDomain: "kuryentech.firebaseapp.com",
  projectId: "kuryentech",
  storageBucket: "kuryentech.firebasestorage.app",
  messagingSenderId: "582635932865",
  appId: "1:582635932865:web:264239eddf209f7de0d840",
  measurementId: "G-DWSWF4H2K4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);