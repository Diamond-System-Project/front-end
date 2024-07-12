import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAzeRbfpcDfpKCHWJVMmMl_E-8W6tkgwr0",
  authDomain: "diamond-font-end.firebaseapp.com",
  projectId: "diamond-font-end",
  storageBucket: "diamond-font-end.appspot.com",
  messagingSenderId: "811885457585",
  appId: "1:811885457585:web:1c83bf5c4da6dbf4283290",
  measurementId: "G-90SLG0P78X"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { app, analytics, storage, ref, uploadBytes, getDownloadURL };
