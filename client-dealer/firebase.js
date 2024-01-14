// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrDxnVz4DVUlnyXGSKwtEJBaO6a5zo0Vc",
  authDomain: "aquadrop-7f434.firebaseapp.com",
  projectId: "aquadrop-7f434",
  storageBucket: "aquadrop-7f434.appspot.com",
  messagingSenderId: "92559930186",
  appId: "1:92559930186:web:80552fab56d5dc507cc7b3",
  measurementId: "G-J5GY3DWJS2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
