import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
// import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyApDHlERftLFS0wc-AYeVwTfKlM2jIo8n0",
  authDomain: "friendlychat-f9643.firebaseapp.com",
  databaseURL: "https://friendlychat-f9643.firebaseio.com",
  projectId: "friendlychat-f9643",
  storageBucket: "friendlychat-f9643.appspot.com",
  messagingSenderId: "457585863227",
  appId: "1:457585863227:web:cf055addd7f809a2f24a1e",
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);

// Initialize Firestore
const FIREBASE_DB = getFirestore(FIREBASE_APP);

// Initialize Firebase Auth with AsyncStorage persistence
const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage), // Correctly set the persistence
});
export { FIREBASE_APP, FIREBASE_DB, FIREBASE_AUTH };
