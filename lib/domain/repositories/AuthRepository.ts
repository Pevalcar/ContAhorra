import { User } from "firebase/auth";

export default class AuthRepository {
  login(email: string, password: string): User {
    throw new Error("Method not implemented.");
  }

  logout() {
    throw new Error("Method not implemented.");
  }

  register(email: string, password: string) {
    throw new Error("Method not implemented.");
  }
}
