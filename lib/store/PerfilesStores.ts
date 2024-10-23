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
  error: Error | null;
  update: boolean;
  currentProfile: Perfil | null;
  setCurrentPerfil: (perfil: Perfil) => void;
  setColor: (color: string) => void;
  getProfileByID: (id: string) => Perfil;
  setAvatar: (avatar: string) => void;
  setName: (name: string) => void;
  fetchPerfiles: () => Promise<void>;
  addPerfil: () => Promise<void>;
  deletePerfil: (id: string) => void;
  updatePerfil: () => void;
}

export const usePerfilesStore = create<IPerfilesStore>((set, get) => ({
  perfiles: [],
  loagin: false,
  Error: null,
  currentProfile: new Perfil({
    name: "",
    avatar_url: "avatar_1",
  }),
  error: null,
  update: false,
  setColor: (color: MyColorsCategories) => {
    const { currentProfile } = get();
    currentProfile.color = color;
    set({ currentProfile: currentProfile });
  },
  getProfileByID: (id: string) => {
    const { perfiles } = get();
    const newState = perfiles.filter((c) => c.id === id);
    return newState[0];
  },
  setAvatar: (avatar: string) => {
    const { currentProfile } = get();
    currentProfile.avatar_url = avatar;
    set({ currentProfile: currentProfile });
  },
  setName: (name: string) => {
    const { currentProfile } = get();
    currentProfile.name = name;
    set({ currentProfile: currentProfile });
  },
  fetchPerfiles: async () => {
    const { update, perfiles } = get();
    set({ loagin: true });
    if (!update) {
      try {
        const initialPerfiles = await getAllProfileByUserOwnerID.execute();
        set({ perfiles: initialPerfiles, update: false, loagin: false });
      } catch (error) {
        console.error("Error al guardar la transacción:", error);
        set({ Error: error as Error, loagin: false });
      }
    }
  },
  addPerfil: async () => {
    const { perfiles, currentProfile } = get();
    const user = useStoreSesion.getState().user;

    set({ loagin: true });

    try {
      const uuid = randomUUID();
      const data = new Perfil({
        id: uuid,
        name: currentProfile.name,
        avatar_url: currentProfile.avatar_url,
        color: currentProfile.color,
        userOwnerID: user.id,
      });
      console.log("data", data);

      await addProfile.execute(data);
      set({
        loagin: false,
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
  setCurrentPerfil: (perfil: Perfil) => {
    set({ currentProfile: perfil });
  },
  updatePerfil: async () => {
    const { perfiles, currentProfile } = get();
    set({ loagin: true });
    try {
      await updateProfile.execute(currentProfile);
      const newState = perfiles.map((c) => (c.id === currentProfile.id ? currentProfile : c));
      set({ perfiles: newState, loagin: false });
    } catch (error) {
      console.error("Error al guardar la transacción:", error);
      set({ Error: error as Error, loagin: false });
      throw error;
    }
  },
}));
