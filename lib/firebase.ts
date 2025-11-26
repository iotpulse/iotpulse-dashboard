import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDVORAx1Bnkg8ANl-f-cH6Y1n0goKcc2xM",
  authDomain: "iotpulses.firebaseapp.com",
  projectId: "iotpulses",
  storageBucket: "iotpulses.firebasestorage.app",
  messagingSenderId: "707722753331",
  appId: "1:707722753331:web:03bef396870301b2613a46",
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
