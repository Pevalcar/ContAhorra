import { auth } from "../configs/firebaseConfig";
import { User } from "firebase/auth";
import { create } from "zustand";

interface ConstsStore {
  useRegister: boolean;
  user?: User | null;
  admin: boolean;
  fetchUser: () => Promise<User | null>;
  SingOut: () => void;
}
//TODO asignar roles https://firebase.google.com/docs/auth/admin/custom-claims
export const useConstsStore = create<ConstsStore>((set) => ({
  useRegister: false,
  user: null,
  admin: false,
  fetchUser: async () => {
    const user = auth.currentUser;
    if (user) {
      const admin = await user.getIdTokenResult();
      const isAdmin = admin?.claims.role === "ADMIN";
      set({ useRegister: true, admin: isAdmin, user });
      return user;
    } else {
      set({ useRegister: false, admin: false, user: null });
      return null;
    }
  },
  SingOut: () => {
    set({ useRegister: false, admin: false, user: null });
  },
}));
