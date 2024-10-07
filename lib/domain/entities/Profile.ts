import type { userOwnerID } from "@/Types/types";

export class Perfil {
  readonly id: string;
  name: string;
  avatar_url: string;
  userOwnerID: userOwnerID;
  userReferredID: string;
  uptodataBase: boolean;
  emojis: string;

  constructor(params: {
    id?: string;
    name: string;
    avatar_url: string;
    userOwnerID?: userOwnerID;
    userReferredID?: string;
    uptodataBase?: boolean;
    emojis?: string;
  }) {
    this.id = params.id ?? "";
    this.name = params.name;
    this.avatar_url = params.avatar_url;
    this.userOwnerID = params.userOwnerID ?? "1";
    this.userReferredID = params.userReferredID ?? "";
    this.uptodataBase = params.uptodataBase ?? false;
    this.emojis = params.emojis ?? "";
  }
}
