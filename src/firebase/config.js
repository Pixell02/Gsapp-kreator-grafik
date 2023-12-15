import { initializeApp } from "firebase/app";
import { browserSessionPersistence, getAuth, setPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDmqmCgUHChFn88wr71Rzos0S2K__Wovp4",
  authDomain: "gsapp.pl",
  projectId: "poster-dd714",
  storageBucket: "poster-dd714.appspot.com",
  messagingSenderId: "230369778825",
  measurementId: "G-8T0X5E7934",
};

// init firebase
initializeApp(firebaseConfig);

// init firestore
const db = getFirestore();

const auth = getAuth();
setPersistence(auth, browserSessionPersistence);
export { auth, db };
