// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKhnZERBh-wWMFxCjDFXs96n1DG6UWxO0",
  authDomain: "daytripplanner-e77fc.firebaseapp.com",
  projectId: "daytripplanner-e77fc",
  storageBucket: "daytripplanner-e77fc.firebasestorage.app",
  messagingSenderId: "278180329484",
  appId: "1:278180329484:web:ca60da77ea00864def5629",
  measurementId: "G-2RPDNG61MC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
//const analytics = getAnalytics(app);