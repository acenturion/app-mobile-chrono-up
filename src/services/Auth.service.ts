import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "@/firebase/config";
import {AuthUser} from "@/model/AuthUser";


const signIn = async ({email, password}: AuthUser) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('User signed in:', user);
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error('Error signing in:', errorCode, errorMessage);
  }
};

export {
  signIn
}