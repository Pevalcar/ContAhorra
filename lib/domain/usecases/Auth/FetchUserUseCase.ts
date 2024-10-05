import { User } from "@/lib/domain/entities";
import AuthRepositoryI from "@/lib/domain/repositories/AuthRepositoryI";

export class FetchUserUseCase {
  private authRepository: AuthRepositoryI;
  constructor(authRepository: AuthRepositoryI) {
    this.authRepository = authRepository;
  }

  async execute(): Promise<User | null> {
    return await this.authRepository.fetchUser();
  }
}
