import type {
  Categoria,
  Cuenta,
  TiposDeTransacciones,
  Transaccion,
} from "@/Types/types";
import * as Crypto from "expo-crypto";
import { create } from "zustand";

interface ITransaccionSate {
  categoriSelect: Categoria | null;
  cuentaSelect: Cuenta | null;
  type: TiposDeTransacciones;
  description: string;
  setCategoriaId: (id: Categoria) => void;
  setCuentaId: (id: Cuenta) => void;
  setType: (type: TiposDeTransacciones) => void;
  setDescription: (description: string) => void;
}

export const useTransactionToADDState = create<ITransaccionSate>((set) => ({
  categoriSelect: null,
  cuentaSelect: null,
  type: "Gasto",
  description: "",

  setCuentaId: (id: Cuenta) => {
    set({ cuentaSelect: id });
  },
  setCategoriaId: (id: Categoria) => {
    set({ categoriSelect: id });
  },
  setType: (type: TiposDeTransacciones) => {
    set({ type: type });
  },

  setDescription: (description: string) => {
    set({ description: description });
  },
}));

type ITransactionToAddStores = {
  transacction: Transaccion;
  setCategoriaId: (id: Categoria) => void;
  setCuentaId: (id: Cuenta) => void;
  setType: (type: TiposDeTransacciones) => void;
  setDescription: (description: string) => void;
  setAmount: (amount: number) => void;
};

export const useTransactionToAddStore = create<ITransactionToAddStores>(
  (set, get) => ({
    transacction: {
      title: "",
      account: "0",
      category: "0",
      type: "Gasto",
      description: "",
      balance: 0,
      date: "",
      id: Crypto.randomUUID(),
    },
    setCuentaId: (id: Cuenta) => {
      set({ transacction: { ...get().transacction, account: id.id } });
    },
    setCategoriaId: (id: Categoria) => {
      set({ transacction: { ...get().transacction, category: id.id } });
    },
    setType: (type: TiposDeTransacciones) => {
      set({ transacction: { ...get().transacction, type: type } });
    },

    setDescription: (description: string) => {
      set({
        transacction: { ...get().transacction, description: description },
      });
    },
    setAmount: (amount: number) => {
      set({ transacction: { ...get().transacction, balance: amount } });
    },
  }),
);
