// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAxBt3jaEq22z_eyYFdpjQedsEn2R57rZ0",
    authDomain: "movie-app-2c00d.firebaseapp.com",
    projectId: "movie-app-2c00d",
    storageBucket: "movie-app-2c00d.appspot.com",
    messagingSenderId: "820200098121",
    appId: "1:820200098121:web:dab3c1ef81ab2fa109b298"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app



