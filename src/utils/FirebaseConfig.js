import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
const app = firebase.initializeApp({
  apiKey: "AIzaSyBYEAsuQkYG_5ZqS4_mPF2YURoIpYnb6Es",
  authDomain: "mark-it-13bfd.firebaseapp.com",
  projectId: "mark-it-13bfd",
  storageBucket: "mark-it-13bfd.appspot.com",
  messagingSenderId: "564734503338",
  appId: "1:564734503338:web:fc8e0228fa2875337f23d3",
});

export const firebaseAuth = app.auth();
export const database = app.database();
