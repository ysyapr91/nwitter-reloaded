import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB7MaMVJgfkqw8ByG8cryLsZPe8NchtPsY",
  authDomain: "testfirebase-1f5b0.firebaseapp.com",
  projectId: "testfirebase-1f5b0",
  storageBucket: "testfirebase-1f5b0.appspot.com",
  messagingSenderId: "34352097715",
  appId: "1:34352097715:web:6bc43a132e045e911f43c6",
  measurementId: "G-C2SHQB9RBZ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);