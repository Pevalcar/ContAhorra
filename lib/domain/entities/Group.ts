export class Group {
  readonly id: string;
  name: string;
  icon: string;
  userOwnerID: string;
  uptodataBase: boolean;
  usersIdInGroup: string[];
  color: string;

  constructor(params: {
    id?: string;
    name: string;
    icon: string;
    userOwnerID?: string;
    uptodataBase?: boolean;
    usersIdInGroup?: string[];
    color?: string;
  }) {
    this.id = params.id ?? "";
    this.name = params.name;
    this.icon = params.icon;
    this.userOwnerID = params.userOwnerID ?? "1";
    this.uptodataBase = params.uptodataBase ?? false;
    this.usersIdInGroup = params.usersIdInGroup ?? [];
    this.color = params.color ?? "white";
  }
}
