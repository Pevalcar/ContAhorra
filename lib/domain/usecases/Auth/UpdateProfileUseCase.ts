import AuthRepositoryI from "@/lib/domain/repositories/AuthRepositoryI";

export class UpdateProfileUseCase {
  private authRepository: AuthRepositoryI;
  constructor(authRepository: AuthRepositoryI) {
    this.authRepository = authRepository;
  }

  async execute(displayName: string, photoURL: string) {
    return await this.authRepository.updateProfile(displayName, photoURL);
  }
}
