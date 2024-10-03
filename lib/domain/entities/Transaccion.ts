import type { TiposDeTransacciones, userOwnerID } from "@/Types/types";

export class Transaccion {
  readonly id: string;
  title: string;
  balance: number;
  type: TiposDeTransacciones;
  date: number;
  description: string;
  categoryID: string;
  accountID: string;
  uptodataBase: boolean;
  prestadoaName: string;
  prestadoaID: string;
  userOwnerID: userOwnerID;

  constructor(params: {
    id: string;
    balance: number;
    type: TiposDeTransacciones;
    date: number;
    title?: string;
    description?: string;
    categoryID?: string;
    accountID?: string;
    userOwnerID?: userOwnerID;
    prestadoaID?: string;
    uptodataBase?: boolean;
    prestadoaName?: string;
  }) {
    this.id = params.id;
    this.balance = params.balance;
    this.type = params.type;
    this.date = params.date;
    this.title = params.title ?? "";
    this.description = params.description ?? "";
    this.categoryID = params.categoryID ?? "";
    this.accountID = params.accountID ?? "";
    this.userOwnerID = params.userOwnerID ?? "";
    this.prestadoaID = params.prestadoaID ?? "";
    this.uptodataBase = params.uptodataBase ?? false;
    this.prestadoaName = params.prestadoaName ?? "";
  }
}
