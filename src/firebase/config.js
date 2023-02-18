import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, setPersistence, browserSessionPersistence, inMemoryPersistence } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDmqmCgUHChFn88wr71Rzos0S2K__Wovp4",
  authDomain: "poster-dd714.firebaseapp.com",
  projectId: "poster-dd714",
  storageBucket: "poster-dd714.appspot.com",
  messagingSenderId: "230369778825",
  appId: "1:230369778825:web:ca530fbe3f69a40eacfa58",
  measurementId: "G-8T0X5E7934"
};

  // init firebase
  initializeApp(firebaseConfig);

  // init firestore
  const db = getFirestore();
  
  
  const auth = getAuth();
  setPersistence(auth, browserSessionPersistence)
  export { db, auth };