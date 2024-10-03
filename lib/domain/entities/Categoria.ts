import type { MyIconos, TiposDeTransacciones, userOwnerID } from "@/Types/types";

export class Categoria {
  readonly id: string;
  name: string;
  icon: MyIconos;
  type: TiposDeTransacciones;
  userOwnerID: userOwnerID;
  uptodataBase: boolean;

  constructor(params: {
    id?: string;
    name: string;
    icon: MyIconos;
    userOwnerID: userOwnerID;
    type: TiposDeTransacciones;
    uptodataBase: boolean;
  }) {
    this.id = params.id ?? "";
    this.name = params.name;
    this.icon = params.icon;
    this.userOwnerID = params.userOwnerID ?? "";
    this.uptodataBase = params.uptodataBase ?? false;
    this.type = params.type ?? "Gasto";
  }
}
