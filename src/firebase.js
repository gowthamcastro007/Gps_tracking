import firebase from 'firebase/compat/app';
import "firebase/compat/auth";

const app = firebase.initializeApp({
    apiKey: "AIzaSyCLVehYKQ3ZPWxheHx-HKxVr6cVtNfe6xA",
    authDomain: "gps-tracking-f3550.firebaseapp.com",
    databaseURL: "https://gps-tracking-f3550-default-rtdb.firebaseio.com",
    projectId: "gps-tracking-f3550",
    storageBucket: "gps-tracking-f3550.firebasestorage.app",
    messagingSenderId: "420903094198",
    appId: "1:420903094198:web:89f839c2950b421b1e6317",
    measurementId: "G-M4YLNKPCM7"
  })
export const auth = app.auth()
export default app

