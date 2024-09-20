import { DEFAULT_STATE_CUENTAS } from "../config";
import { type Cuenta } from "@/Types/types";
import { Platform } from "react-native";
import { create } from "zustand";

export const LOCAL_DB_CUENTAS = "LOCAL_DB_CUENTAS";

const initialState = (() => {
  if (Platform.OS === "web") {
    try {
      if (typeof localStorage !== "undefined") {
        // eslint-disable-next-line no-undef
        const value = localStorage.getItem(LOCAL_DB_CUENTAS);
        if (value) {
          return JSON.parse(value);
        }
      }
    } catch (e) {
      console.error("Local storage is unavailable:", e);
    }
  } else {
    // try { TODO hay que arreglar el esto para dispositivos https://docs.expo.dev/versions/latest/sdk/sqlite/
    //   AsyncStorage.getItem(LOCAL_DB_CUENTAS).then((value) => {
    //     if (value) {
    //       console.info("value in store");
    //       return JSON.parse(value);
    //     }
    //   });
    // } catch (e) {
  }

  return DEFAULT_STATE_CUENTAS;
})();

interface ICuentasStore {
  cuentas: Cuenta[];
  addCuenta: (data: Cuenta) => void;
  deleteCuenta: (id: string) => void;
  updateCuenta: (data: Cuenta) => void;
}

export const useCuentasStore = create<ICuentasStore>((set, get) => ({
  cuentas: initialState,
  addCuenta: (data: Cuenta) => {
    const { cuentas } = get();
    const newState = [...cuentas, data];
    set({
      cuentas: newState,
    });
  },
  deleteCuenta: (id: string) => {
    const { cuentas } = get();
    const newState = cuentas.filter((c) => c.id !== id);
    set({ cuentas: newState });
  },
  updateCuenta: (data: Cuenta) => {
    const { cuentas } = get();
    const newState = cuentas.map((c) => (c.id === data.id ? data : c));
    set({ cuentas: newState });
  },
}));
