// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';


const firebaseConfig = {
    apiKey: "AIzaSyBA8ifGOjikF75GjqiOCANYOQGPJjzM2Bw",
    authDomain: "aquadrop-webapp.firebaseapp.com",
    projectId: "aquadrop-webapp",
    storageBucket: "aquadrop-webapp.appspot.com",
    messagingSenderId: "673989075834",
    appId: "1:673989075834:web:7d325e7556d03baddeacc3",
    measurementId: "G-H8DJ6JQF5Q"
  };

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const fs = firebase.firestore();
const storage = firebase.storage();

export {auth, fs, storage};