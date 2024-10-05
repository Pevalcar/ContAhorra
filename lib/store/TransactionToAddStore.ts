import { Categoria, Cuenta } from "../domain/entities";
import { useCategoriaStore } from "./CategoriaStore";
import { useCuentasStore } from "./CuentasStore";
import type { TiposDeTransacciones } from "@/Types/types";
import { create } from "zustand";

interface ITransaccionSate {
  loagin: boolean;
  categoriasData: Categoria[];
  cuentasData: Cuenta[];
  categoriSelect: Categoria | null;
  cuentaSelect: Cuenta | null;
  type: number;
  description: string;
  amount: number;
  date: Date;
  Error: Error | null;
  fetchCuentaData: () => void;
  fetchCategoriasData: () => void;
  setCategoriaId: (id: Categoria) => void;
  setCuentaId: (id: Cuenta) => void;
  setType: (type: number) => void;
  setAmount: (amount: number) => void;
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
  Error: null,
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
  setAmount: (amount: number) => {
    set({ amount: amount });
  },
  setDate: (date: Date) => {
    set({ date: date });
  },
  fetchCuentaData: async () => {
    set({ loagin: true });
    try {
      const cuentas = await useCuentasStore.getState().fetchCuentas();
      set({ cuentasData: cuentas });
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
      // cuentaSelect: null,
      // categoriSelect: null,
      type: 1,
      description: "",
      amount: 0,
      date: new Date(),
    });
  },
}));

function newFilters(filter: number) {
  const posibleFilter: TiposDeTransacciones[] = ["Ingreso", "Gasto", "Transferencia"];
  const newFilter = posibleFilter[filter] as TiposDeTransacciones;
  return newFilter;
}
