import { initializeApp } from 'firebase/app';

import { getFirestore } from 'firebase/firestore';

import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBSBRy3NL20w89WU0hKxEyNXdrBJAFgFtI",
    authDomain: "netflix-clone-a11b1.firebaseapp.com",
    projectId: "netflix-clone-a11b1",
    storageBucket: "netflix-clone-a11b1.appspot.com",
    messagingSenderId: "793150421775",
    appId: "1:793150421775:web:90e6f86f21eb2748ee9c7a"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);

  export {auth}
  export default db
