import { auth } from "../configs/firebaseConfig";
import User from "../domain/entities/User";
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
    const credentials = auth.currentUser;
    if (credentials) {
      const admin = await credentials.getIdTokenResult();
      const isAdmin = admin?.claims.role === "ADMIN";
      const user = User.fromFirebaseUser(credentials);
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
