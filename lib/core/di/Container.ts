import SupabaseAuthRepository from "@/lib/data/repositories/SupabaseAuthRepository";
import {
  FetchUserUseCase,
  GoogleAuthUseCase,
  LoginUseCase,
  RecoverUseCase,
  RegisterUseCase,
  SingOutUseCase,
  UpdatePassword,
  UpdateProfileUseCase,
  VerificationUseCase,
} from "@/lib/domain/usecases/Auth";

const AuthRepository = new SupabaseAuthRepository();

const loginUseCase = new LoginUseCase(AuthRepository);

const singOutUseCase = new SingOutUseCase(AuthRepository);

const registerUseCase = new RegisterUseCase(AuthRepository);

const recoverUseCase = new RecoverUseCase(AuthRepository);

const verificationUseCase = new VerificationUseCase(AuthRepository);

const updatePasswordUseCase = new UpdatePassword(AuthRepository);

const updateProfileUseCase = new UpdateProfileUseCase(AuthRepository);

const googleAuthUseCase = new GoogleAuthUseCase(AuthRepository);

const fetchUser = new FetchUserUseCase(AuthRepository);

export {
  googleAuthUseCase,
  loginUseCase,
  recoverUseCase,
  registerUseCase,
  singOutUseCase,
  updatePasswordUseCase,
  updateProfileUseCase,
  verificationUseCase,
  fetchUser,
};
