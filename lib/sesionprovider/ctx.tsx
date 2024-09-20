import { useMyToast } from "../Hooks/useToast";
import { useStorageState } from "../useStorageState";
import { auth } from "@/firebaseConfig";
import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { type PropsWithChildren, createContext, useContext, useState } from "react";

const AuthContext = createContext<{
  signIn: () => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
  error: string | null;
}>({
  signIn: () => null,
  signOut: () => null,
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
  const [error, setError] = useState<string | null>(null);

  const { handleToast } = useMyToast();

  return (
    <AuthContext.Provider
      value={{
        signIn: async () => {
          setError(null);

          await signInWithEmailAndPassword(auth, "tests@test.com", "1234568")
            .then((result) => {
              setSession(result.user.email);
              router.replace("/");
              handleToast("Login", "Login correcto", "info");
            })
            .catch((error) => {
              console.error(error);
              setError(error.message);
              throw error;
            });
        },
        signOut: () => {
          auth.signOut();
          handleToast("Logout", "Logout correcto", "success");
          setSession(null);
          router.replace("/login");
        },
        session,
        isLoading,
        error,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
