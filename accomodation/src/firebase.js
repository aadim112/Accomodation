import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyC11Okl0IaWO30_wsT6uyKi0N1uOajyRs4",
    authDomain: "setone-c5e5d.firebaseapp.com",
    projectId: "setone-c5e5d",
    storageBucket: "setone-c5e5d.firebasestorage.app",
    messagingSenderId: "153904508931",
    appId: "1:153904508931:web:a4fc54af3367e92e391e36",
    measurementId: "G-S890NFSX5Y"
};
  
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

export default database;