import { useTransaccionesStore } from "./TransaccionesStore";
import { TiposDeTransacciones } from "@/Types/types";
import { DEFAULT_STATE_CATEGORIAS, LOCAL_DB_CATEGORIAS_NAME } from "@/lib/configs/config";
import {
  addCategory,
  deleteCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
} from "@/lib/core/di/Container";
import { Categoria } from "@/lib/domain/entities";
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
  fetchCategorias: (type: TiposDeTransacciones) => Promise<void>;
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
    //TODO esto esta para cuando encesite paginarlos o agregarlos con header iugual a las fechas de las transacciones
    const { categorias } = get();
    const orderedCategorias = categorias.sort((a, b) => a.type.localeCompare(b.type));
    set({ orderCategoris: orderedCategorias });
    return orderedCategorias;
  },
  initialFetch: async () => {
    set({ loagin: true, Error: null });
    try {
      const initialCategorias = await getAllCategory.execute();
      if (initialCategorias) set({ categorias: initialCategorias, loagin: false });
    } catch (error) {
      console.error("Error al guardar la transacción:", error);
      set({ Error: error as Error, loagin: false });
    }
  },
  getCategoryByID: (id: string) => {
    const { categorias } = get();
    const categoriase = categorias.find((c) => c.id === id);
    if (categoriase) {
      return categoriase;
    }
    return null;
  },
  fetchCategorias: async (type: TiposDeTransacciones) => {
    //TODO revisar porq ue creo que no es ni necesario
    const { categorias } = get();
    const initialCategoria = categorias.filter((c: Categoria) => c.type.localeCompare(type) === 0);
    set({ orderCategoris: initialCategoria });
  },
  addCategoria: async (data: Categoria) => {
    const { categorias } = get();
    set({ loagin: true, Error: null });
    try {
      await addCategory.execute(data);
      const newState = sortCategorias([...categorias, data]);

      set({
        categorias: newState,
        loagin: false,
      });
    } catch (error) {
      console.error("Error al guardar la transacción:", error);
      set({ Error: error as Error, loagin: false });
    }
  },
  deleteCategoria: async (id: string) => {
    const { categorias } = get();
    set({ loagin: true, Error: null });
    try {
      await deleteCategory.execute(id);
      const newState = categorias.filter((c) => c.id !== id);
      set({ categorias: newState, loagin: false });
      useTransaccionesStore.getState().getAllTransaccion();
    } catch (error) {
      console.error("Error al guardar la transacción:", error);
      set({ Error: error as Error });
    }
  },
  updateCategoria: async (data: Categoria) => {
    const { categorias } = get();
    set({ loagin: true, Error: null });
    try {
      //TODO por terminar esto
      await updateCategory.execute(data);
      const newState = categorias.map((c) => (c.id === data.id ? data : c));
      set({ categorias: newState, loagin: false });
    } catch (E) {
      console.log("Error actualizando categoria ", E);
      set({ Error: E as Error, loagin: false });
    }
  },
}));

function sortCategorias(categorias: Categoria[]) {
  const orderedCategorias = categorias.sort((a, b) => b.type.localeCompare(a.type));
  return orderedCategorias;
}
