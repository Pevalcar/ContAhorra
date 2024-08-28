import { DEFAULT_STATE, LOCAL_DB_TRANSACCIONES } from "../config";
import { type Transaccion } from "@/Types/types";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { create } from "zustand";

const initialState = (() => {
  if (Platform.OS === "web") {
    try {
      if (typeof localStorage !== "undefined") {
        const value = localStorage.getItem(LOCAL_DB_TRANSACCIONES);
        if (value) {
          return JSON.parse(value);
        }
      }
    } catch (e) {
      console.error("Local storage is unavailable:", e);
    }
  } else {
    // try { TODO hay que arreglar el esto para dispositivos https://docs.expo.dev/versions/latest/sdk/sqlite/
    //   AsyncStorage.getItem(LOCAL_DB_TRANSACCIONES).then((value) => {
    //     if (value) {
    //       console.info("value in store");
    //       return JSON.parse(value);
    //     }
    //   });
    // } catch (e) {
    //   console.error("Local storage is unavailable:", e);
    // }
  }
  return DEFAULT_STATE;
})();
// in web funciona como localStorage pero en android supera la capacidades de SecureStore

async function saveState(state: Transaccion[], key = LOCAL_DB_TRANSACCIONES) {
  if (Platform.OS === "web") {
    try {
      if (state === null) {
        localStorage.removeItem(LOCAL_DB_TRANSACCIONES);
      } else {
        localStorage.setItem(LOCAL_DB_TRANSACCIONES, JSON.stringify(state));
      }
    } catch (e) {
      console.error("Local storage is unavailable:", e);
    }
  } else {
    // if (state == null) {
    //   await SecureStore.deleteItemAsync(LOCAL_DB_TRANSACCIONES);
    // } else {
    //   try {
    //     await AsyncStorage.setItem(
    //       LOCAL_DB_TRANSACCIONES,
    //       JSON.stringify(state),
    //     );
    //   } catch (e) {
    //     throw e;
    //   }
    // }
  }
}
//TODO implementar  reducer https://github.com/midudev/aprendiendo-react/blob/master/projects/06-shopping-cart/src/context/cart.jsx

interface ITransaccionesStore {
  transacciones: Transaccion[];
  addTransaccion: (transaccion: Transaccion) => void;
  deleteTransaccion: (id: string) => void;
  updateTransaccion: (transaccion: Transaccion) => void;
}

export const useTransaccionesStore = create<ITransaccionesStore>(
  (set, get) => ({
    transacciones: initialState,
    addTransaccion: (transaccion: Transaccion) => {
      const { transacciones } = get();
      const newState = [transaccion, ...transacciones];
      saveState(newState);
      set({ transacciones: newState });
    },
    deleteTransaccion: (id: string) => {
      const { transacciones } = get();
      const newState = transacciones.filter(
        (transaccion) => transaccion.id !== id,
      );
      saveState(newState);
      set({ transacciones: newState });
    },
    updateTransaccion: (transaccion: Transaccion) => {
      const { transacciones } = get();
      const newState = transacciones.map((t) =>
        t.id === transaccion.id ? transaccion : t,
      );
      saveState(newState);
      set({ transacciones: newState });
    },
  }),
);
