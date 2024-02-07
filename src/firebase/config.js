import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCkDPOObEK-SRM4s81EfSVO_0gavCfqscc",
  authDomain: "optimityweb-74380.firebaseapp.com",
  projectId: "optimityweb-74380",
  storageBucket: "optimityweb-74380.appspot.com",
  messagingSenderId: "557617985895",
  appId: "1:557617985895:web:e8ac3b8217088e006497c2"
};

  // init firebase
initializeApp(firebaseConfig)

// init services
const firestoreDb = getFirestore()
const auth = getAuth()

export { firestoreDb, auth }