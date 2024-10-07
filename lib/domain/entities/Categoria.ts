import type { MyIconos, TiposDeTransacciones, userOwnerID } from "@/Types/types";

export class Categoria {
  readonly id: string;
  name: string;
  icon: MyIconos;
  type: TiposDeTransacciones;
  prestamo: boolean;
  userOwnerID: userOwnerID;
  uptodataBase: boolean;

  constructor(params: {
    id?: string;
    name: string;
    icon: MyIconos;
    userOwnerID: userOwnerID;
    type: TiposDeTransacciones;
    prestamo?: boolean;
    uptodataBase: boolean;
  }) {
    this.id = params.id ?? "";
    this.name = params.name;
    this.icon = params.icon;
    this.userOwnerID = params.userOwnerID ?? "1";
    this.uptodataBase = params.uptodataBase ?? false;
    this.prestamo = params.prestamo ?? false;
    this.type = params.type ?? "Gasto";
  }
}
