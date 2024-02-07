import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

  // init firebase
initializeApp(firebaseConfig)

// init services
const firestoreDb = getFirestore()
const auth = getAuth()

export { firestoreDb, auth }
