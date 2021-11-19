// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHpasj0VzWl6CKqh8w2D3E5c3NEkxde5Y",
  authDomain: "nbchtarjeta.firebaseapp.com",
  projectId: "nbchtarjeta",
  storageBucket: "nbchtarjeta.appspot.com",
  messagingSenderId: "402364029647",
  appId: "1:402364029647:web:fccede8a851822daec75ba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export default db;