import {getApp, getApps, initializeApp} from "firebase/app";
import {getFirestore} from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCwTZgzUHaobrT0A8Wco8AFNgdawyIl9TQ",
    authDomain: "notion-clone-5e349.firebaseapp.com",
    projectId: "notion-clone-5e349",
    storageBucket: "notion-clone-5e349.firebasestorage.app",
    messagingSenderId: "259416902822",
    appId: "1:259416902822:web:139c319a286a7a88023867",
    measurementId: "G-FKKMZ4PL9B"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app)