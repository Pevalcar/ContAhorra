import { addProfile, getAllProfileByUserOwnerID } from "@/lib/core/di/Container";
import { Perfil } from "@/lib/domain/entities";
import { randomUUID } from "expo-crypto";
import { t } from "i18next";
import { create } from "zustand";

interface IPerfilesStore {
  loagin: boolean;
  Error: Error | null;
  perfiles: Perfil[];
  avatar: string;
  name: string;
  error: Error | null;
  update: boolean;
  getProfileByID: (id: string) => Perfil;
  setAvatar: (avatar: string) => void;
  setName: (name: string) => void;
  fetchPerfiles: () => Promise<Perfil[]>;
  addPerfil: () => Promise<void>;
  deletePerfil: (id: string) => void;
  updatePerfil: (data: Perfil) => void;
}

export const usePerfilesStore = create<IPerfilesStore>((set, get) => ({
  perfiles: [],
  loagin: false,
  Error: null,
  avatar: "avatar_1",
  name: "",
  error: null,
  update: false,
  getProfileByID: (id: string) => {
    const { perfiles } = get();

    const newState = perfiles.filter((c) => c.id === id);
    return newState[0];
  },
  setAvatar: (avatar: string) => {
    set({ avatar: avatar });
  },
  setName: (name: string) => {
    set({ name: name });
  },
  fetchPerfiles: async () => {
    const { update, perfiles } = get();
    set({ loagin: true });
    if (update) {
      try {
        const initialPerfiles = await getAllProfileByUserOwnerID.execute();
        set({ perfiles: initialPerfiles, update: true });
      } catch (error) {
        console.error("Error al guardar la transacción:", error);
        set({ Error: error as Error });
      }
    }
    set({ loagin: false });
    return perfiles;
  },
  addPerfil: async () => {
    const { perfiles, name, avatar, fetchPerfiles } = get();
    set({ loagin: true });
    try {
      const uuid = randomUUID();
      if (name === "") {
        set({ loagin: false });
        throw new Error(t("debe-ingresar-un-nombre"));
      }
      const data = new Perfil({ id: uuid, name: name, avatar_url: avatar });
      await addProfile.execute(data);
      set({
        loagin: false,
        name: "",
        avatar: "avatar_1",
        update: false,
      });
      await fetchPerfiles();
    } catch (error) {
      console.error("Error al guardar la transacción:", error);
      set({ Error: error as Error, loagin: false });
      throw error;
    }
  },
  deletePerfil: (id: string) => {
    const { perfiles } = get();
    const newState = perfiles.filter((c) => c.id !== id);
    set({ perfiles: newState });
  },
  updatePerfil: (data: Perfil) => {
    const { perfiles } = get();
    const newState = perfiles.map((c) => (c.id === data.id ? data : c));
    set({ perfiles: newState });
  },
}));
