import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-storage.js";

const firebaseConfig = {
   apiKey: "AIzaSyBbZ_odUQfN88FSsT-cFBJXG2HImbCW0LQ",
    authDomain: "myblog-aa50c.firebaseapp.com",
    projectId: "myblog-aa50c",
    storageBucket: "myblog-aa50c.appspot.com",
    messagingSenderId: "830040025866",
    appId: "1:830040025866:web:231e7b20c96d74bd4fe8f3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { app, auth, db, storage };