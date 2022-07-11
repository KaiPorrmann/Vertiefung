// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
// import 'firebase/compat/storage';
// import { useEffect } from "react";
// import useStore from "store";
// import shallow from "zustand/shallow";
// import { collection, doc, getDoc, updateDoc } from "firebase/firestore";

//Ufuk firebase Optimierung
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {

  apiKey: "AIzaSyAklOBCm3Qsiae1VRA5GGFm2oVNnljXBe8",
  authDomain: "karsten-9aa6c.firebaseapp.com",
  projectId: "karsten-9aa6c",
  storageBucket: "karsten-9aa6c.appspot.com",
  messagingSenderId: "911018607477",
  appId: "1:911018607477:web:d430da8a56a9dbbc15493c"
  
    /* apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_API_KEY,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID */
};

// let app;

// if(firebase.apps.length===0){
//   app=firebase.initializeApp(firebaseConfig)
// }
// else{
//   app= firebase.app();
// }

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);



//Zustand for user
// export function useAuthUser() {
//     const [setUser, resetUser] = useStore(
//       (s) => [s.setUser, s.resetUser],
//       shallow
//     );
  
//     useEffect(() => {
//       async function getUser(user) {
//         if (!user) {
//           resetUser();
//         } else {

//           const userRef = doc(db, "users", user.uid);

//           const userDoc = await getDoc(userRef);
//           if (userDoc.exists()) {
//             setUser(userDoc.data());
//           } else {
//             resetUser();
//           }
//         }
//       }
      // HIER MUSSTE AUSKOMMENTIEREN !!!
      //const unsubscribe = onAuthStateChanged(auth, (user) => {
        //getUser(user);
      //});
  
  //     return () => {
  //       unsubscribe();
  //     };
  //   }, [setUser, resetUser]);
  // };



  export {db, auth, storage};
  
