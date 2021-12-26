import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyD9lHtR8MAGgf-W0EBTQh8S5xY9dyuv-AE',
  authDomain: 'goodjobs-fcadd.firebaseapp.com',
  databaseURL: 'https://goodjobs-fcadd-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'goodjobs-fcadd',
  storageBucket: 'goodjobs-fcadd.appspot.com',
  messagingSenderId: '930053222925',
  appId: '1:930053222925:web:55acd629ec7fa90a7e5b44',
  measurementId: 'G-JB7MGTPB95',
});

const db = firebaseApp.firestore();

const auth = firebaseApp.auth();

export { db, auth };
