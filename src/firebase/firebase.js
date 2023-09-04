// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore ,collection} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4iul9mi_bIKLxdtSM2cArHsDR2WT0Ev8",
  authDomain: "screencraze-52f89.firebaseapp.com",
  projectId: "screencraze-52f89",
  storageBucket: "screencraze-52f89.appspot.com",
  messagingSenderId: "1014481251963",
  appId: "1:1014481251963:web:34557d0576aad198de3cde"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const moviesRef = collection(db , "movies")
export const reviewsRef = collection(db , "reviews")
export const UserCollection = collection(db , "users")
export const database = getAuth(app)
export default app;

