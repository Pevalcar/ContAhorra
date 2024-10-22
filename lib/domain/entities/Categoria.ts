import type {
  MyColorsCategories,
  MyIconos,
  TiposDeTransacciones,
  userOwnerID,
} from "@/Types/types";

export class Categoria {
  readonly id: string;
  name: string;
  icon: MyIconos;
  type: TiposDeTransacciones;
  prestamo: boolean;
  userOwnerID: userOwnerID;
  color: MyColorsCategories;
  uptodataBase: boolean;

  constructor(params: {
    id?: string;
    name?: string;
    icon?: MyIconos;
    userOwnerID?: userOwnerID;
    type?: TiposDeTransacciones;
    prestamo?: boolean;
    uptodataBase?: boolean;
    color?: string;
  }) {
    this.id = params.id ?? "";
    this.name = params.name ?? "";
    this.icon = params.icon ?? "FileEdit";
    this.userOwnerID = params.userOwnerID ?? "1";
    this.uptodataBase = params.uptodataBase ?? false;
    this.prestamo = params.prestamo ?? false;
    this.type = params.type ?? "Gasto";
    this.color = params.color ?? "#26A69A";
  }

  static FromSQLite(params: any) {
    return new Categoria({
      id: params.id,
      name: params.name,
      icon: params.icon,
      userOwnerID: params.userOwnerID,
      uptodataBase: params.uptodataBase === 1,
      prestamo: params.prestamo === 1,
      type: params.type,
      color: params.color,
    });
  }
}
