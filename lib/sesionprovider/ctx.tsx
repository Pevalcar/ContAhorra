import { useConstsStore } from "../store/ConstsStore";
import { useStorageState } from "../useStorageState";
import { auth } from "@/firebaseConfig";
import { FirebaseError } from "firebase/app";
import {
  EmailAuthProvider,
  createUserWithEmailAndPassword,
  reauthenticateWithCredential,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updatePassword,
} from "firebase/auth";
import React, { type PropsWithChildren, createContext, useContext, useState } from "react";

const AuthContext = createContext<{
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  registrar: (email: string, password: string) => void;
  recoverPassword: (email: string) => void;
  sendEmailVerification: () => void;
  updatePassword: (password: string, newPassword: string) => void;
  session?: string | null;
  isLoading: boolean;
  error: FirebaseError | { code: string } | null;
}>({
  signIn: (email: string, password: string) => null,
  signOut: () => null,
  registrar: (email: string, password: string) => null,
  recoverPassword: (email: string) => null,
  sendEmailVerification: () => null,
  updatePassword: (password: string, newPassword: string) => null,
  session: null,
  isLoading: false,
  error: null,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const [error, setError] = useState<FirebaseError | { code: string } | null>(null);
  const cerrarSesion = useConstsStore((state) => state.SingOut);

  return (
    <AuthContext.Provider
      value={{
        signIn: async (email: string = "test@test.com", password: string = "123456") => {
          setError(null);

          await signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
              setSession(result.user.email);
              setError({ code: "success-login" });
            })
            .catch((error: FirebaseError) => {
              setError(error);
              throw error;
            });
        },
        signOut: () => {
          auth.signOut();
          setError(null);
          cerrarSesion();
          setSession(null);
        },
        registrar: async (email: string = "test@test.com", password: string = "123456") => {
          setError(null);

          await createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
              setSession(result.user.email);
              setError({ code: "success-register" });
            })
            .catch((error: FirebaseError) => {
              setError(error);
              throw error;
            });
        },
        recoverPassword: async (email: string) => {
          setError(null);

          await sendPasswordResetEmail(auth, email)
            .then(() => {
              setError({ code: "success-recover" });
            })
            .catch((error: FirebaseError) => {
              setError(error);
              throw error;
            });
        },
        sendEmailVerification: async () => {
          setError(null);
          if (!auth.currentUser) {
            return;
          }
          await sendEmailVerification(auth.currentUser)
            .then(() => {
              setError({ code: "success-verification" });
            })
            .catch((error: FirebaseError) => {
              setError(error);
              throw error;
            });
        },
        updatePassword: async (password: string, newPassword: string) => {
          setError(null);

          if (!auth.currentUser) {
            return;
          }
          try {
            const userCredential = await EmailAuthProvider.credential(
              auth.currentUser?.email ?? "",
              password,
            );
            const result = await reauthenticateWithCredential(auth.currentUser, userCredential);
            if (result.user) {
              await updatePassword(result.user, newPassword);
              setError({ code: "success-update-password" });
            }
          } catch (error) {
            setError(error as FirebaseError);
            throw error;
          }
          //TODO verificar que esto funcione
        },
        session,
        isLoading,
        error,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
