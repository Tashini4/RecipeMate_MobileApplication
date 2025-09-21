// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAM9xos3WiTRVoXE7KjuxP019cMoNns468",
  authDomain: "recipemate-93638.firebaseapp.com",
  projectId: "recipemate-93638",
  storageBucket: "recipemate-93638.firebasestorage.app",
  messagingSenderId: "599416981717",
  appId: "1:599416981717:web:5a64fb445019ed9dacfa5c"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
 const db = getFirestore(app);
 export { auth, db };

