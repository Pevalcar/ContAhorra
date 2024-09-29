import User from "../entities/User";

export default class AuthRepositoryI {
  login(email: string, password: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }

  logout() {
    throw new Error("Method not implemented.");
  }

  register(email: string, password: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }

  recoverPassword(email: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  sendEmailVerification(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  updatePassword(password: string, newPassword: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  updateProfile(displayName: string, photoURL: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  signInWhitIdToken(): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
}
