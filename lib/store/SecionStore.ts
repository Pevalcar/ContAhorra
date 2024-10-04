import {
  fetchUser,
  googleAuthUseCase,
  loginUseCase,
  recoverUseCase,
  registerUseCase,
  singOutUseCase,
  updatePasswordUseCase,
  updateProfileUseCase,
  verificationUseCase,
} from "../core/di/Container";
import { User } from "@/lib/domain/entities";
import { create } from "zustand";

interface PropsStroe {
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  registrar: (email: string, password: string) => void;
  recoverPassword: (email: string) => void;
  sendEmailVerification: () => void;
  updatePassword: (password: string, newPassword: string) => void;
  updateProfile: (displayName: string, photoURL: string) => void;
  getGoogleCredential: () => void;
  fetchUser: () => void;
  user?: User | null;
  isLoading: boolean;
  error: Error | null;
}
export const useStoreSesion = create<PropsStroe>((set, get) => ({
  signIn: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const user = await loginUseCase.execute(email, password);
      if (user) {
        set({ user, isLoading: false, error: new Error("success-login") });
      }
    } catch (error) {
      set({ isLoading: false, error: error as Error });
      throw error;
    }
  },
  signOut: async () => {
    await singOutUseCase.execute();
    set({ user: null, error: null });
  },
  registrar: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const user = await registerUseCase.execute(email, password);
      if (user) {
        set({ user, isLoading: false, error: new Error("success-register") });
      }
    } catch (error) {
      set({ isLoading: false, error: error as Error });
      throw error;
    }
  },
  recoverPassword: async (email: string) => {
    set({ isLoading: true, error: null });
    try {
      await recoverUseCase.execute(email);
      set({ isLoading: false, error: new Error("success-recover") });
    } catch (error) {
      set({ isLoading: false, error: error as Error });
      throw error;
    }
  },
  sendEmailVerification: async () => {
    set({ isLoading: true, error: null });
    try {
      await verificationUseCase.execute();
      set({ isLoading: false, error: new Error("success-verification") });
    } catch (error) {
      set({ isLoading: false, error: error as Error });
      throw error;
    }
  },
  updatePassword: async (password: string, newPassword: string) => {
    set({ isLoading: true, error: null });
    try {
      await updatePasswordUseCase.execute(password, newPassword);
      set({ isLoading: false, error: new Error("success-update-password") });
    } catch (error) {
      set({ isLoading: false, error: error as Error });
      throw error;
    }
  },
  updateProfile: async (displayName: string, photoURL: string) => {
    set({ isLoading: true, error: null });
    try {
      await updateProfileUseCase.execute(displayName, photoURL);
      set({ isLoading: false, error: new Error("success-update-profile") });
    } catch (error) {
      set({ isLoading: false, error: error as Error });
      throw error;
    }
  },
  getGoogleCredential: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await googleAuthUseCase.execute();
      set({ isLoading: false, error: new Error("success-google-auth") });
      if (response) {
        set({ user: response, isLoading: false, error: null });
      }
    } catch (error) {
      set({ isLoading: false, error: error as Error });
      throw error;
    }
  },
  fetchUser: async () => {
    const users = await get().user;
    if (users) {
      return;
    }
    set({ isLoading: true });
    try {
      const user = await fetchUser.execute();
      set({ user });
    } catch (error) {
      set({ isLoading: false, error: error as Error });
      throw error;
    }
    set({ isLoading: false });
  },
  user: null,
  isLoading: false,
  error: null,
}));
