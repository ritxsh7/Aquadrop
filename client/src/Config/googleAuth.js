import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "./firebase";

const provider = new GoogleAuthProvider();
const auth = getAuth(app);
auth.languageCode = "it";

//backend url
const backendUrl = process.env.REACT_APP_BACKEND_URL;

//stores and states

export const signinWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    var { email, displayName } = result.user;
    console.log(email, displayName);
    return { email, displayName };
  } catch (error) {
    console.log(error);
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  }
};
