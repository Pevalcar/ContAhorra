import { auth } from "@/lib/configs/firebaseConfig";
import AuthRepository from "@/lib/domain/repositories/AuthRepository";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

export default class FirebaseAuthRepository extends AuthRepository {
  async login(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  }

  async logout() {
    await signOut(auth);
  }
}
