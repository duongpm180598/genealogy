// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDRY3qWum0BAqvMSaEtZwTSRvDm_RQvoZA',
  authDomain: 'ilu-genealogy.firebaseapp.com',
  databaseURL: 'https://ilu-genealogy-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'ilu-genealogy',
  storageBucket: 'ilu-genealogy.firebasestorage.app',
  messagingSenderId: '354790390049',
  appId: '1:354790390049:web:9e64f9d841fc7841746660'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)