import { MyIconos } from "@/Types/types";

export class Cuenta {
  readonly id: string;
  name: string;
  icon: MyIconos;
  userOwnerID: string;
  uptodataBase: boolean;

  constructor(params: {
    id?: string;
    name: string;
    icon: MyIconos;
    userOwnerID?: string;
    uptodataBase?: boolean;
  }) {
    this.id = params.id ?? "";
    this.name = params.name;
    this.icon = params.icon;
    this.userOwnerID = params.userOwnerID ?? "";
    this.uptodataBase = params.uptodataBase ?? false;
  }
}
