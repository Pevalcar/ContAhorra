import User from "@/lib/domain/entities/User";
import AuthRepositoryI from "@/lib/domain/repositories/AuthRepositoryI";

export class RegisterUseCase {
  private authRepository: AuthRepositoryI;
  constructor(authRepository: AuthRepositoryI) {
    this.authRepository = authRepository;
  }

  async execute(email: string, password: string): Promise<User | null> {
    return await this.authRepository.register(email, password);
  }
}
