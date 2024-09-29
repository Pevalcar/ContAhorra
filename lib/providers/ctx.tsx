import {
  googleAuthUseCase,
  loginUseCase,
  recoverUseCase,
  registerUseCase,
  singOutUseCase,
  updatePasswordUseCase,
  updateProfileUseCase,
  verificationUseCase,
} from "../core/di/Container";
import { useConstsStore } from "../store/ConstsStore";
import { useStorageState } from "../store/useStorageState";
import React, { type PropsWithChildren, createContext, useContext, useState } from "react";

const AuthContext = createContext<{
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  registrar: (email: string, password: string) => void;
  recoverPassword: (email: string) => void;
  sendEmailVerification: () => void;
  updatePassword: (password: string, newPassword: string) => void;
  updateProfile: (displayName: string, photoURL: string) => void;
  getGoogleCredential: () => void;
  session?: string | null;
  isLoading: boolean;
  error: Error | null;
}>({
  signIn: (email: string, password: string) => null,
  signOut: () => null,
  registrar: (email: string, password: string) => null,
  recoverPassword: (email: string) => null,
  sendEmailVerification: () => null,
  updatePassword: (password: string, newPassword: string) => null,
  updateProfile: (displayName: string | null, photoURL: string | null) => null,
  getGoogleCredential: () => null,
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

//TODO extraer logica a un servicio de sesion y usar hook
export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const [error, setError] = useState<Error | null>(null);
  const cerrarSesion = useConstsStore((state) => state.SingOut);

  return (
    <AuthContext.Provider
      value={{
        signIn: async (email: string = "test@test.com", password: string = "123456") => {
          setError(null);

          try {
            const user = await loginUseCase.execute(email, password);
            if (user) {
              setError(new Error("success-login"));
              setSession(user.email);
            }
          } catch (error) {
            setError(error as Error);
            throw error;
          }
        },
        signOut: async () => {
          await singOutUseCase.execute();
          setError(null);
          cerrarSesion(); //TODO ver si se puede hacer en signOut
          setSession(null);
        },
        registrar: async (email: string = "test@test.com", password: string = "123456") => {
          setError(null);
          try {
            const user = await registerUseCase.execute(email, password);
            if (user) {
              setError(new Error("success-register"));
              setSession(user.email);
            }
          } catch (error) {
            setError(error as Error);
            throw error;
          }
        },
        recoverPassword: async (email: string) => {
          setError(null);
          try {
            await recoverUseCase.execute(email);
            setError(new Error("success-recover"));
          } catch (error) {
            setError(error as Error);
            throw error;
          }
        },
        sendEmailVerification: async () => {
          setError(null);
          try {
            await verificationUseCase.execute();
            setError(new Error("success-verification"));
          } catch (error) {
            setError(error as Error);
            throw error;
          }
        },
        updatePassword: async (password: string, newPassword: string) => {
          setError(null);

          try {
            await updatePasswordUseCase.execute(password, newPassword);
            setError(new Error("success-update-password"));
          } catch (error) {
            setError(error as Error);
            throw error;
          }
        },
        updateProfile: async (displayName: string, photoURL: string) => {
          setError(null);

          try {
            await updateProfileUseCase.execute(displayName, photoURL);
            setError(new Error("success-update-profile"));
          } catch (error) {
            setError(error as Error);
            throw error;
          }
        },
        getGoogleCredential: async () => {
          setError(null);
          try {
            const response = await googleAuthUseCase.execute();
            setError(new Error("success-google-auth"));
            if (response) {
              setSession(response.email);
            }
          } catch (error) {
            setError(error as Error);
            throw error;
          }
        },
        session,
        isLoading,
        error,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
