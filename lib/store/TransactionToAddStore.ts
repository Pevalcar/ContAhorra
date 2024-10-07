import { addTransaccion } from "../core/di/Container";
import { Categoria, Cuenta, Perfil, Transaccion, Perfil as string } from "../domain/entities";
import { useCategoriaStore } from "./CategoriaStore";
import { useCuentasStore } from "./CuentasStore";
import { usePerfilesStore } from "./PerfilesStores";
import { useTransaccionesStore } from "./TransaccionesStore";
import type { TiposDeTransacciones } from "@/Types/types";
import * as Crypto from "expo-crypto";
import { create } from "zustand";

interface ITransaccionSate {
  loagin: boolean;
  categoriasData: Categoria[];
  cuentasData: Cuenta[];
  categoriSelect: Categoria | null;
  cuentaSelect: Cuenta | null;
  perfilesData: Perfil[];
  type: number;
  description: string;
  amount: number;
  date: Date;
  prestado: Perfil | null;
  Error: Error | null;
  setPrestado: (prestado: string | null) => void;
  saveTransaction: () => Promise<void>;
  fetchCuentaData: () => void;
  fetchCategoriasData: () => void;
  fetchPerfilesData: () => void;
  setCategoriaId: (id: Categoria) => void;
  setCuentaId: (id: Cuenta) => void;
  setType: (type: number) => void;
  setAmount: (amount: number | null) => void;
  setDescription: (description: string) => void;
  setDate: (date: Date) => void;
  reset: () => void;
}

export const useTransactionToADDState = create<ITransaccionSate>((set, get) => ({
  loagin: false,
  categoriSelect: null,
  cuentaSelect: null,
  categoriasData: [],
  cuentasData: [],
  type: 1,
  description: "",
  amount: 0,
  date: new Date(),
  prestado: null,
  Error: null,
  perfilesData: [],
  setPrestado: (prestado: string | null) => {
    const { perfilesData } = get();
    if (prestado === null) {
      set({ prestado: null });
      return;
    }
    const newState = perfilesData.filter((c) => c.id !== prestado);
    set({ prestado: newState[0] });
  },
  setCuentaId: (id: Cuenta) => {
    set({ cuentaSelect: id });
  },
  setCategoriaId: (id: Categoria) => {
    set({ categoriSelect: id });
  },
  setType: (type: number) => {
    set({ type });
  },
  setDescription: (description: string) => {
    set({ description: description });
  },
  setAmount: (amount: number | null) => {
    if (amount === null) {
      set({ amount: 0 });
      return;
    }
    set({ amount: amount });
  },
  setDate: (date: Date) => {
    set({ date: date });
  },
  fetchCuentaData: async () => {
    set({ loagin: true });
    try {
      const cuentas = await useCuentasStore.getState().fetchCuentas();
      set({ cuentasData: cuentas, cuentaSelect: cuentas[0] });
    } catch (error) {
      console.error("Error al guardar la transacción:", error);
      set({ Error: error as Error });
    }
    set({ loagin: false });
  },
  fetchPerfilesData: async () => {
    set({ loagin: true });
    try {
      const perfiles = await usePerfilesStore.getState().fetchPerfiles();
      set({ perfilesData: perfiles, prestado: perfiles[0] });
    } catch (error) {
      console.error("Error al guardar la transacción:", error);
      set({ Error: error as Error });
    }
    set({ loagin: false });
  },
  fetchCategoriasData: async () => {
    const { type } = get();
    set({ loagin: true });
    try {
      const categorias = await useCategoriaStore.getState().fetchCategorias(newFilters(type));
      set({ categoriasData: categorias, categoriSelect: categorias[0] });
    } catch (error) {
      console.error("Error al guardar la transacción:", error);
      set({ Error: error as Error });
    }
    set({ loagin: false });
  },
  reset: () => {
    set({
      type: 1,
      description: "",
      amount: 0,
      date: new Date(),
    });
  },
  saveTransaction: async () => {
    const {
      amount,
      date,
      description,
      type,
      cuentaSelect,
      categoriSelect,
      Error: error,
      prestado,
    } = get();
    try {
      set({ loagin: true });
      if (amount === 0 || amount === null) {
        throw new Error("Debe ingresar una cantidad válida");
      } else if (description === "") {
        throw new Error("Debe ingresar una descripción válida");
      } else if (prestado === null && categoriSelect?.prestamo) {
        throw new Error("Debe seleccionar un perfil válido");
      } else if (categoriSelect === null) {
        throw new Error("Debe seleccionar una categoría válida");
      } else if (cuentaSelect === null) {
        throw new Error("Debe seleccionar una cuenta válida");
      }
      //TODO prestado a funciones de verificacion
      const newDate = Math.floor(date.getTime() / 1000);
      const transaccion = new Transaccion({
        id: Crypto.randomUUID(),
        balance: amount,
        type: newFilters(type),
        date: newDate,
        description: description,
        categoryID: categoriSelect.id,
        accountID: cuentaSelect.id,
        userOwnerID: "1",
        prestadoaID: prestado?.id ?? "",
        uptodataBase: false,
        prestadoaName: prestado?.name ?? "",
      });

      await addTransaccion.execute(transaccion);
      {
        await useTransaccionesStore.getState().getAllTransaccion();
      }
      set({ loagin: false });
    } catch (error: any) {
      console.error("Error al guardar la transacción:", error);
      set({ Error: error?.message ?? "Error al guardar la transacción", loagin: false });
      throw error;
    }
  },
}));

function newFilters(filter: number) {
  const posibleFilter: TiposDeTransacciones[] = ["Ingreso", "Gasto", "Transferencia"];
  const newFilter = posibleFilter[filter] as TiposDeTransacciones;
  return newFilter;
}
