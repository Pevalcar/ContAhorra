import { auth } from "@/lib/configs/firebaseConfig";
import User from "@/lib/domain/entities/User";
import { FirebaseControlErrors } from "@/lib/domain/error/FirebaseControErrors";
import AuthRepositoryI from "@/lib/domain/repositories/AuthRepositoryI";
import { FirebaseError } from "firebase/app";
import {
  EmailAuthProvider,
  createUserWithEmailAndPassword,
  reauthenticateWithCredential,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  updateProfile,
} from "firebase/auth";

export default class FirebaseAuthRepository extends AuthRepositoryI {
  async login(email: string, password: string) {
    //in case of error, return null and error message

    const usercredential = await signInWithEmailAndPassword(auth, email, password).catch(
      (error: FirebaseError) => {
        throw FirebaseControlErrors.getError(error.code);
      },
    );
    if (!usercredential.user) {
      return null;
    }
    const user = User.fromFirebaseUser(usercredential.user);
    return user;
  }
  async register(email: string, password: string) {
    const usercredential = await createUserWithEmailAndPassword(auth, email, password).catch(
      (error: FirebaseError) => {
        throw FirebaseControlErrors.getError(error.code);
      },
    );
    if (!usercredential.user) {
      return null;
    }
    const user = User.fromFirebaseUser(usercredential.user);
    return user;
  }
  async recoverPassword(email: string) {
    await sendPasswordResetEmail(auth, email).catch((error) => {
      throw FirebaseControlErrors.getError(error.code);
    });
  }
  async sendEmailVerification() {
    if (!auth.currentUser) {
      throw FirebaseControlErrors.getError("session-no-iniciada");
    }
    await sendEmailVerification(auth.currentUser).catch((error) => {
      throw FirebaseControlErrors.getError(error.code);
    });
  }

  async updatePassword(password: string, newPassword: string) {
    if (!auth.currentUser) {
      throw FirebaseControlErrors.getError("session-no-iniciada");
    }
    try {
      const userCredential = await EmailAuthProvider.credential(
        auth.currentUser?.email ?? "",
        password,
      );
      const result = await reauthenticateWithCredential(auth.currentUser, userCredential);
      if (result.user) {
        await updatePassword(result.user, newPassword).catch((error) => {
          throw FirebaseControlErrors.getError(error.code);
        });
      }
    } catch (error: any) {
      throw FirebaseControlErrors.getError(error.code as any);
    }
  }
  async updateProfile(displayName: string, photoURL: string) {
    if (!auth.currentUser) {
      throw FirebaseControlErrors.getError("session-no-iniciada");
    }
    updateProfile(auth.currentUser, {
      displayName,
      photoURL,
    }).catch((error) => {
      throw FirebaseControlErrors.getError(error.code);
    });
  }
  async logout() {
    await signOut(auth);
  }
}
