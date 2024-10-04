import type { MyIconos, userOwnerID } from "@/Types/types";

export class Cuenta {
  readonly id: string;
  name: string;
  icon: MyIconos;
  userOwnerID: userOwnerID;
  uptodataBase: boolean;

  constructor(params: {
    id?: string;
    name: string;
    icon: MyIconos;
    userOwnerID?: userOwnerID;
    uptodataBase?: boolean;
  }) {
    this.id = params.id ?? "";
    this.name = params.name;
    this.icon = params.icon;
    this.userOwnerID = params.userOwnerID ?? "1";
    this.uptodataBase = params.uptodataBase ?? false;
  }
}
