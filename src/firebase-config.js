import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDmqmCgUHChFn88wr71Rzos0S2K__Wovp4",
    authDomain: "poster-dd714.firebaseapp.com",
    projectId: "poster-dd714",
    storageBucket: "poster-dd714.appspot.com",
    messagingSenderId: "230369778825",
    appId: "1:230369778825:web:5990e27bd0facbe5acfa58",
    measurementId: "G-LQDCZ6P8SC"
};

const authentication = initializeApp(firebaseConfig);

const db = getFirestore();

export { db, authentication }
