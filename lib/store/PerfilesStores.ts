import { DB_PERFILES } from "../db/local/db_local";
import { Perfil } from "../domain/entities";
import { create } from "zustand";

interface IPerfilesStore {
  loagin: boolean;
  Error: Error | null;
  perfiles: Perfil[];
  fetchPerfiles: () => Promise<Perfil[]>;
  addPerfil: (data: Perfil) => void;
  deletePerfil: (id: string) => void;
  updatePerfil: (data: Perfil) => void;
}

export const usePerfilesStore = create<IPerfilesStore>((set, get) => ({
  perfiles: [],
  loagin: false,
  Error: null,
  fetchPerfiles: async () => {
    set({ loagin: true });
    try {
      const initialPerfiles = DB_PERFILES;
      set({ perfiles: initialPerfiles });
    } catch (error) {
      console.error("Error al guardar la transacción:", error);
      set({ Error: error as Error });
    }
    set({ loagin: false });
    return get().perfiles;
  },
  addPerfil: (data: Perfil) => {
    const { perfiles } = get();
    const newState = [...perfiles, data];
    set({
      perfiles: newState,
    });
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
