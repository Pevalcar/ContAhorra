import { INITIALCATEGORY, INITIALCUENTA } from "../config";
import { storeData } from "../useStorageState";
import type { Categoria, Cuenta, TiposDeTransacciones } from "@/Types/types";
import { create } from "zustand";

interface ITransaccionSate {
  categoriSelect: Categoria | null;
  cuentaSelect: Cuenta | null;
  type: TiposDeTransacciones;
  description: string;
  amount: number;
  date: Date;
  setCategoriaId: (id: Categoria) => void;
  setCuentaId: (id: Cuenta) => void;
  setType: (type: TiposDeTransacciones) => void;
  setAmount: (amount: number) => void;
  setDescription: (description: string) => void;
  setDate: (date: Date) => void;
  reset: () => void;
}

export const useTransactionToADDState = create<ITransaccionSate>((set) => ({
  categoriSelect: null,
  cuentaSelect: null,
  type: "Gasto",
  description: "",
  amount: 0,
  date: new Date(),
  setCuentaId: (id: Cuenta) => {
    storeData({ key: INITIALCUENTA, value: id });
    set({ cuentaSelect: id });
  },
  setCategoriaId: (id: Categoria) => {
    storeData({ key: INITIALCATEGORY, value: id });
    set({ categoriSelect: id });
  },
  setType: (type: TiposDeTransacciones) => {
    set({ type: type });
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
  reset: () => {
    set({
      cuentaSelect: null,
      categoriSelect: null,
      type: "Gasto",
      description: "",
      amount: 0,
      date: new Date(),
    });
  },
}));
