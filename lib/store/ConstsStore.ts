import { fetchUser } from "../core/di/Container";
import User from "../domain/entities/User";
import { create } from "zustand";

interface ConstsStore {
  useRegister: boolean;
  user?: User | null;
  admin: boolean;
  setUser: (user: User | null) => void;
  refreshUser: () => void;
  fetchUser: () => void;
  SingOut: () => void;
}
//TODO asignar roles https://firebase.google.com/docs/auth/admin/custom-claims
export const useConstsStore = create<ConstsStore>((set, get) => ({
  useRegister: false,
  user: null,
  admin: false,
  setUser: (user: User | null) => set({ user }),
  refreshUser: async () => {
    const user = await fetchUser.execute();
    set({ user });
  },
  fetchUser: async () => {
    const users = await get().user;
    if (users) {
      return;
    }
    const user = await fetchUser.execute();
    set({ user });
  },
  SingOut: () => {
    set({ useRegister: false, admin: false, user: null });
  },
}));
