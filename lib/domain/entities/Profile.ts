export class Perfil {
  readonly id?: string;
  name: string;
  photoURL: string;
  userOwnerID?: string;
  userReferredID?: string;
  uptodataBase?: boolean;
  emoji?: string;

  constructor(params: {
    id?: string;
    name: string;
    photoURL: string;
    userOwnerID?: string;
    userReferredID?: string;
    uptodataBase?: boolean;
    emoji?: string;
  }) {
    this.id = params.id;
    this.name = params.name;
    this.photoURL = params.photoURL;
    this.userOwnerID = params.userOwnerID;
    this.userReferredID = params.userReferredID;
    this.uptodataBase = params.uptodataBase;
    this.emoji = params.emoji;
  }
}
