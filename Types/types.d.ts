import { Iconos } from "@/lib/configs/images";

export interface TransactionTotal {
  totalExpenses: number;
  totalIncome: number;
  totalTransfer: number;
}

export type userOwnerID = string;

export type TiposDeTransacciones = "Ingreso" | "Gasto" | "Transferencia";

export type MyIconos = (typeof Iconos)[number];
