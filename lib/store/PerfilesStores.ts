import { useStoreSesion } from "./SecionStore";
import { MyColorsCategories } from "@/Types/types";
import {
  addProfile,
  deleteProfile,
  getAllProfileByUserOwnerID,
  getProfileByID,
  updateProfile,
  updateProfileUseCase,
} from "@/lib/core/di/Container";
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
  color: MyColorsCategories;
  error: Error | null;
  update: boolean;
  setColor: (color: string) => void;
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
  color: "#7E57C2",
  error: null,
  update: false,
  setColor: (color: MyColorsCategories) => {
    set({ color: color });
  },
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
    if (!update) {
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
    const { perfiles, name, avatar, color } = get();
    const user = useStoreSesion.getState().user;

    set({ loagin: true });

    try {
      const uuid = randomUUID();
      const data = new Perfil({
        id: uuid,
        name: name,
        avatar_url: avatar,
        color,
        userOwnerID: user?.id,
      });
      await addProfile.execute(data);
      set({
        loagin: false,
        name: "",
        avatar: "avatar_1",
        update: false,
        perfiles: [...perfiles, data],
      });
    } catch (error) {
      console.error("Error al guardar la transacción:", error);
      set({ Error: error as Error, loagin: false });
      throw error;
    }
  },
  deletePerfil: async (id: string) => {
    const { perfiles } = get();
    set({ loagin: true });
    try {
      await deleteProfile.execute(id);
      const newState = perfiles.filter((c) => c.id !== id);
      set({ perfiles: newState, loagin: false });
    } catch (error) {
      console.error("Error al guardar la transacción:", error);
      set({ Error: error as Error, loagin: false });
      throw error;
    }
  },
  updatePerfil: async (data: Perfil) => {
    const { perfiles } = get();
    set({ loagin: true });
    try {
      await updateProfile.execute(data);
      const newState = perfiles.map((c) => (c.id === data.id ? data : c));
      set({ perfiles: newState, loagin: false });
    } catch (error) {
      console.error("Error al guardar la transacción:", error);
      set({ Error: error as Error, loagin: false });
      throw error;
    }
  },
}));
