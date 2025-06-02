import { getApp, initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA0d8YGycmbSgfrEQdIjCfiZ7AUaG-tV2A",

  authDomain: "notion-clone-fd9af.firebaseapp.com",

  projectId: "notion-clone-fd9af",

  storageBucket: "notion-clone-fd9af.firebasestorage.app",

  messagingSenderId: "749684378832",

  appId: "1:749684378832:web:a7058d25867878379da2d5",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
