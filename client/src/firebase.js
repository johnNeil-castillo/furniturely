// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3UNTFKm5DDrzuj6DkD3ILp1tGnBVlaGs",
  authDomain: "furniturely-31f9b.firebaseapp.com",
  projectId: "furniturely-31f9b",
  storageBucket: "furniturely-31f9b.appspot.com",
  messagingSenderId: "617974311143",
  appId: "1:617974311143:web:512e5832fc64dca998da42",
};

// initialize firebase app
const app = initializeApp(firebaseConfig);

// export
export const auth = getAuth(app);

export const googleAuthProvider = new GoogleAuthProvider();
