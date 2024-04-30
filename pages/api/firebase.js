import { getDatabase } from 'firebase/database';
import { initializeApp } from 'firebase/app';

// Inisialisasi Firebase app
const firebaseConfig = {
  apiKey: "AIzaSyCGYwO-sT2hDDkIMDtZ8RN2CJaSwxBWA_Y",
  authDomain: "kitabkuning-50508.firebaseapp.com",
  projectId: "kitabkuning-50508",
  storageBucket: "kitabkuning-50508.appspot.com",
  messagingSenderId: "729946037125",
  appId: "1:729946037125:web:2335302af51a59c09782ec",
  databaseURL: "https://kitabkuning-50508-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Inisialisasi Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Ekspor firebaseApp untuk digunakan di tempat lain
export default firebaseApp;