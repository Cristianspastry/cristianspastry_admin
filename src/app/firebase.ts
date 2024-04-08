import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { FirebaseStorage, getStorage,ref } from "firebase/storage";
import firebase from "firebase/compat/app";

//
const firebaseConfig = {
  apiKey: "AIzaSyBA0kmioZkLBr0HA0wYmUUPhsvcKg_B59g",
  authDomain: "cristian-s-pastry-86a80.firebaseapp.com",
  databaseURL: "https://cristian-s-pastry-86a80-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "cristian-s-pastry-86a80",
  storageBucket: "cristian-s-pastry-86a80.appspot.com",
  messagingSenderId: "814863156625",
  appId: "1:814863156625:web:133dd873ec01ff74dc8630",
  measurementId: "G-876V3DZQ94"
};

if(!firebaseConfig) throw new Error('Firebase config not found');

// Initialize Firebase
if(firebase.apps.length === 0) {
   firebase.initializeApp(firebaseConfig);
}

//const analytics = getAnalytics(app);
const database = getDatabase();

const storage : FirebaseStorage = getStorage();

export { database,storage, };