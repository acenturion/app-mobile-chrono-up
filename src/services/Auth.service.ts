import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "@/firebase/config";
import {AuthUser} from "@/model/AuthUser";
import {User} from "@/model/User";


const signIn = async ({email, password}: AuthUser) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const result = userCredential.user;

    return {
      id: result.uid,
      email: result.email,
    } as User

  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error('Error signing in:', errorCode, errorMessage);
  }
};

export {
  signIn
}