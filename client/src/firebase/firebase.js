// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:  import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "authproject-924dd.firebaseapp.com",
  projectId: "authproject-924dd",
  storageBucket: "authproject-924dd.appspot.com",
  messagingSenderId: "816798915184",
  appId: "1:816798915184:web:c721bf1d0d4977e221f2b5",
  measurementId: "G-KZZTMXGF9R"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


// AIzaSyDE2xO2FlJSOVacoBwy2rYhal-3epg51m4