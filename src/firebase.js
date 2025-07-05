import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAjCyEft7YSoyyKN3fVmFb8jT68ezgp9o0",
  authDomain: "my-notes-app-4a267.firebaseapp.com",
  projectId: "my-notes-app-4a267",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);