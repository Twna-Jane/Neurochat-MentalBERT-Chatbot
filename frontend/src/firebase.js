
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBwJenjzGhSIUSosnmxRBjr50ixzgVKFxU",
  authDomain: "neurochat-mentalbert.firebaseapp.com",
  projectId: "neurochat-mentalbert",
  storageBucket: "neurochat-mentalbert.firebasestorage.app",
  messagingSenderId: "771734941717",
  appId: "1:771734941717:web:5ec13d82523a0ef9339e1c"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
