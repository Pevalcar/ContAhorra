import type { userOwnerID } from "@/Types/types";

export class Perfil {
  readonly id?: string;
  name: string;
  photoURL: string;
  userOwnerID: userOwnerID;
  userReferredID: string;
  uptodataBase: boolean;
  emoji: string;

  constructor(params: {
    id?: string;
    name: string;
    photoURL: string;
    userOwnerID?: userOwnerID;
    userReferredID?: string;
    uptodataBase?: boolean;
    emoji?: string;
  }) {
    this.id = params.id;
    this.name = params.name;
    this.photoURL = params.photoURL;
    this.userOwnerID = params.userOwnerID ?? "1";
    this.userReferredID = params.userReferredID ?? "";
    this.uptodataBase = params.uptodataBase ?? false;
    this.emoji = params.emoji ?? "";
  }
}
