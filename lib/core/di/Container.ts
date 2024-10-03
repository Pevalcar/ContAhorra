import { LOCAL_DB_NAME } from "@/lib/configs/config";
import SupabaseAuthRepository from "@/lib/data/repositories/SupabaseAuthRepository";
import { TransaccionLocalRepository } from "@/lib/data/repositories/TransaccionLocalRepository";
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
import {
  AddTransaccionUseCase,
  DeleteTransaccionUseCase,
  GetAllUseCase,
  GetTotalTransactionsByDateRangeUseCase,
  GetTransactionsByDateRangeUseCase,
  UpdateTransaccionsUseCase,
} from "@/lib/domain/usecases/Transacciones";

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

//Container db
const DBRepositoryLocal = new TransaccionLocalRepository(LOCAL_DB_NAME);

const addTransaccion = new AddTransaccionUseCase(DBRepositoryLocal, DBRepositoryLocal);
const deleteTransaccion = new DeleteTransaccionUseCase(DBRepositoryLocal, DBRepositoryLocal);
const getAllTransaccion = new GetAllUseCase(DBRepositoryLocal, DBRepositoryLocal);
const getTransactionsByDateRang = new GetTransactionsByDateRangeUseCase(
  DBRepositoryLocal,
  DBRepositoryLocal,
);
const updateTransaccion = new UpdateTransaccionsUseCase(DBRepositoryLocal, DBRepositoryLocal);
const getTotalTransactionByDateRange = new GetTotalTransactionsByDateRangeUseCase(
  DBRepositoryLocal,
  DBRepositoryLocal,
);

export {
  addTransaccion,
  deleteTransaccion,
  fetchUser,
  getAllTransaccion,
  getTransactionsByDateRang,
  googleAuthUseCase,
  loginUseCase,
  recoverUseCase,
  registerUseCase,
  singOutUseCase,
  updatePasswordUseCase,
  updateProfileUseCase,
  verificationUseCase,
  updateTransaccion,
  getTotalTransactionByDateRange,
};
