import AuthRepositoryI from "@/lib/domain/repositories/AuthRepositoryI";

export class FetchUserUseCase {
  private authRepository: AuthRepositoryI;
  constructor(authRepository: AuthRepositoryI) {
    this.authRepository = authRepository;
  }

  async execute() {
    return await this.authRepository.fetchUser();
  }
}
