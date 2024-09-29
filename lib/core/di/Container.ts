import FirebaseAuthRepository from "../../data/repositories/FirebaseAuthRepository";
import {
  GoogleAuthUseCase,
  LoginUseCase,
  RecoverUseCase,
  RegisterUseCase,
  SingOutUseCase,
  UpdatePassword,
  UpdateProfileUseCase,
  VerificationUseCase,
} from "@/lib/domain/usecases/Auth";

const AuthRepository = new FirebaseAuthRepository();

const loginUseCase = new LoginUseCase(AuthRepository);

const singOutUseCase = new SingOutUseCase(AuthRepository);

const registerUseCase = new RegisterUseCase(AuthRepository);

const recoverUseCase = new RecoverUseCase(AuthRepository);

const verificationUseCase = new VerificationUseCase(AuthRepository);

const updatePasswordUseCase = new UpdatePassword(AuthRepository);

const updateProfileUseCase = new UpdateProfileUseCase(AuthRepository);

const googleAuthUseCase = new GoogleAuthUseCase(AuthRepository);

export {
  loginUseCase,
  singOutUseCase,
  registerUseCase,
  recoverUseCase,
  verificationUseCase,
  updatePasswordUseCase,
  updateProfileUseCase,
  googleAuthUseCase,
};
