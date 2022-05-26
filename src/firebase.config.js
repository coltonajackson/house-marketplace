// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyATiArDzp2A5Q01Wq_7M7COHuZcbTg0ipA',
  authDomain: 'house-marketplace-app-2d425.firebaseapp.com',
  projectId: 'house-marketplace-app-2d425',
  storageBucket: 'house-marketplace-app-2d425.appspot.com',
  messagingSenderId: '210510694460',
  appId: '1:210510694460:web:6dcf55ead9ea3bcd881b39'
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();