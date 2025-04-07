import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDfPuI8sa0mzn-UMJLT_yqH9rDVVQLqngs",
  authDomain: "wash-d2fac.firebaseapp.com",
  projectId: "wash-d2fac",
  storageBucket: "wash-d2fac.firebasestorage.app",
  messagingSenderId: "106816974736",
  appId: "1:106816974736:web:2950a0b9a821e0e5afcd15",
  measurementId: "G-PFJRT57J43"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);