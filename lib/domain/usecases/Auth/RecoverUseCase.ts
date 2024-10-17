import AuthRepositoryI from "@/lib/domain/repositories/AuthRepositoryI";

export class RecoverUseCase {
  private authRepository: AuthRepositoryI;
  constructor(authRepository: AuthRepositoryI) {
    this.authRepository = authRepository;
  }

  async execute(email: string) {
    return await this.authRepository.recoverPassword(email);
  }
}
