// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyAbdNU6qgpI2a-rT5DoCVFLzNe1fio4i_M",
  authDomain: "bhsthoughts-4d818.firebaseapp.com",
  projectId: "bhsthoughts-4d818",
  storageBucket: "bhsthoughts-4d818.appspot.com",
  messagingSenderId: "939952675351",
  appId: "1:939952675351:web:2dfa3a8f9317e84ea59a52"
};

const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)