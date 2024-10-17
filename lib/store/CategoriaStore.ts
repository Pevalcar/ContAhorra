import { DEFAULT_STATE_CATEGORIAS, LOCAL_DB_CATEGORIAS_NAME } from "../configs/config";
import { Categoria } from "../domain/entities";
import { TiposDeTransacciones } from "@/Types/types";
import { FA5Style } from "@expo/vector-icons/build/FontAwesome5";
import { Platform } from "react-native";
import { create } from "zustand";

const initialState = (() => {
  if (Platform.OS === "web") {
    try {
      if (typeof localStorage !== "undefined") {
        // eslint-disable-next-line no-undef
        const value = localStorage.getItem(LOCAL_DB_CATEGORIAS_NAME);
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
  loagin: boolean;
  Error: Error | null;
  categorias: Categoria[];
  allCategories: Categoria[];
  orderCategoris: Categoria[];
  initialFetch: () => void;
  fetchCategorias: (type: TiposDeTransacciones) => Promise<Categoria[]>;
  addCategoria: (data: Categoria) => void;
  deleteCategoria: (id: string) => void;
  updateCategoria: (data: Categoria) => void;
  getCategoryByID: (id: string) => Categoria | null;
  sortCateforys: () => Categoria[];
}

export const useCategoriaStore = create<ICategoriaStore>((set, get) => ({
  categorias: initialState,
  loagin: false,
  Error: null,
  allCategories: initialState,
  orderCategoris: initialState,
  sortCateforys: () => {
    const { categorias } = get();
    const orderedCategorias = categorias.sort((a, b) => a.type.localeCompare(b.type));
    set({ orderCategoris: orderedCategorias });
    return orderedCategorias;
  },
  initialFetch: async () => {
    set({ loagin: true, Error: null });
    try {
      set({ categorias: initialState });
    } catch (error) {
      console.error("Error al guardar la transacción:", error);
      set({ Error: error as Error });
    }
    set({ loagin: false });
  },
  getCategoryByID(id: string) {
    const { categorias } = get();
    const categoriase = categorias.find((c) => c.id === id);
    if (categoriase) {
      return categoriase;
    }
    return null;
  },
  fetchCategorias: async (type: TiposDeTransacciones) => {
    set({ loagin: true, Error: null });
    try {
      const initialCategoria = initialState.filter((c: Categoria) => c.type === type);
      set({ categorias: initialCategoria });
    } catch (error) {
      console.error("Error al guardar la transacción:", error);
      set({ Error: error as Error });
    }
    set({ loagin: false });
    return get().categorias;
  },
  addCategoria: (data: Categoria) => {
    const { categorias } = get();
    const newState = [...categorias, data];
    set({
      categorias: newState,
    });
  },
  deleteCategoria: (id: string) => {
    const { categorias } = get();
    set({ loagin: true, Error: null });
    const newState = categorias.filter((c) => c.id !== id);
    set({ categorias: newState, loagin: false });
  },
  updateCategoria: (data: Categoria) => {
    const { categorias } = get();
    set({ loagin: true, Error: null });
    const newState = categorias.map((c) => (c.id === data.id ? data : c));
    set({ categorias: newState, loagin: false });
  },
}));
