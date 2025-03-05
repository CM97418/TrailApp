import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBaIB86gGawT6OjYCOomN830iIhkekh99Q",
  authDomain: "trailapp-aa47b.firebaseapp.com",
  projectId: "trailapp-aa47b",
  storageBucket: "trailapp-aa47b.firebasestorage.app",
  messagingSenderId: "796008045213",
  appId: "1:796008045213:web:d02e0dc3a024023524d274",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); //initialiser firestore

export { auth, db };
