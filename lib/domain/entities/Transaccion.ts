import type { TiposDeTransacciones, userOwnerID } from "@/Types/types";

export class Transaccion {
  readonly id: string;
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
  pago: boolean;

  constructor(params: {
    id: string;
    balance?: number;
    type?: TiposDeTransacciones;
    date?: number;
    description?: string;
    categoryID?: string;
    accountID?: string;
    userOwnerID?: userOwnerID;
    prestadoaID?: string;
    uptodataBase?: boolean;
    pago?: boolean;
    prestadoaName?: string;
  }) {
    this.id = params.id;
    this.balance = params.balance ?? 0;
    this.type = params.type ?? "Gasto";
    this.date = params.date ?? new Date().getTime();
    this.description = params.description ?? "";
    this.categoryID = params.categoryID ?? "";
    this.accountID = params.accountID ?? "";
    this.userOwnerID = params.userOwnerID ?? "1";
    this.prestadoaID = params.prestadoaID ?? "";
    this.uptodataBase = params.uptodataBase ?? false;
    this.pago = params.pago ?? false;
    this.prestadoaName = params.prestadoaName ?? "";
  }

  static FromSQLite(params: any) {
    return new Transaccion({
      id: params.id,
      balance: params.balance,
      type: params.type,
      date: params.date,
      description: params.description,
      categoryID: params.categoryID,
      accountID: params.accountID,
      userOwnerID: params.userOwnerID,
      prestadoaID: params.prestadoaID,
      uptodataBase: params.uptodataBase === 1,
      pago: params.pago === 1,
      prestadoaName: params.prestadoaName,
    });
  }
}
