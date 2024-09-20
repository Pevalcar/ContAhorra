import { DEFAULT_STATE_CATEGORIAS, LOCAL_DB_CATEGORIAS } from "../config";
import { Categoria } from "@/Types/types";
import { Platform } from "react-native";
import { create } from "zustand";

const initialState = (() => {
  if (Platform.OS === "web") {
    try {
      if (typeof localStorage !== "undefined") {
        // eslint-disable-next-line no-undef
        const value = localStorage.getItem(LOCAL_DB_CATEGORIAS);
        if (value) {
          return JSON.parse(value);
        }
      }
    } catch (e) {
      console.error("Local storage is unavailable:", e);
    }
  } else {
    // try { TODO hay que arreglar el esto para dispositivos https://docs.expo.dev/versions/latest/sdk/sqlite/
    //   AsyncStorage.getItem(LOCAL_DB_CATEGORIAS).then((value) => {
    //     if (value) {
    //       console.info("value in store");
    //       return JSON.parse(value);
    //     }
    //   });
    // } catch (e) {
    //   console.error("Local storage is unavailable:", e);
    // }
  }
  return DEFAULT_STATE_CATEGORIAS;
})();
interface ICategoriaStore {
  categorias: Categoria[];
  addCategoria: (data: Categoria) => void;
  deleteCategoria: (id: string) => void;
  updateCategoria: (data: Categoria) => void;
}

export const useCategoriaStore = create<ICategoriaStore>((set, get) => ({
  categorias: initialState,
  addCategoria: (data: Categoria) => {
    const { categorias } = get();
    const newState = [...categorias, data];
    set({
      categorias: newState,
    });
  },
  deleteCategoria: (id: string) => {
    const { categorias } = get();
    const newState = categorias.filter((c) => c.id !== id);
    set({ categorias: newState });
  },
  updateCategoria: (data: Categoria) => {
    const { categorias } = get();
    const newState = categorias.map((c) => (c.id === data.id ? data : c));
    set({ categorias: newState });
  },
}));
