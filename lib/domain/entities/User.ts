export default class User {
  id: string;
  email: string | null;
  name: string | null;
  photoURL: string | null;

  constructor(
    id: string | null,
    email: string | null,
    name: string | null,
    photoURL: string | null,
  ) {
    this.id = id ?? "";
    this.email = email ?? null;
    this.name = name ?? null;
    this.photoURL = photoURL ?? null;
  }

  static fromFirebaseUser(user: any) {
    return new User(user.uid, user.email, user.displayName, user.photoURL);
  }
}
