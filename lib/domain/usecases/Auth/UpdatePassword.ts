import AuthRepositoryI from "@/lib/domain/repositories/AuthRepositoryI";

export class UpdatePassword {
  private authRepository: AuthRepositoryI;
  constructor(authRepository: AuthRepositoryI) {
    this.authRepository = authRepository;
  }

  async execute(password: string, newPassword: string) {
    return await this.authRepository.updatePassword(password, newPassword);
  }
}
