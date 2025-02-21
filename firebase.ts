// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdT-jxyBT64VEm1kMuF6D5NOhDJzj4tdE",
  authDomain: "my-news-dragon-recap.firebaseapp.com",
  projectId: "my-news-dragon-recap",
  storageBucket: "my-news-dragon-recap.firebasestorage.app",
  messagingSenderId: "842378284762",
  appId: "1:842378284762:web:b29e614052d2b8e6729fe3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);