import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC-RTRj84sjn5V_TsdzALWrQK7Y0UDa8CY",
  authDomain: "salon-c8f70.firebaseapp.com",
  projectId: "salon-c8f70",
  storageBucket: "salon-c8f70.firebasestorage.app",
  messagingSenderId: "357449020287",
  appId: "1:357449020287:web:39ef785642236cda29a04a"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);