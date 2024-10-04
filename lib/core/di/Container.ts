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
  AddAccountUseCase,
  AddCategoryUseCase,
  AddProfileUseCase,
  AddTransaccionUseCase,
  DeleteAccountUseCase,
  DeleteCategoryUseCase,
  DeleteProfileUseCase,
  DeleteTransaccionUseCase,
  GetAllAccountUseCase,
  GetAllCategoryUseCase,
  GetAllProfileByUserOwnerIDUseCase,
  GetAllUseCase,
  GetProfileByIDUseCase,
  GetTotalTransactionsByDateRangeUseCase,
  GetTransactionsByDateRangeUseCase,
  UpdateAccountUseCase,
  UpdateCategoryUseCase,
  UpdateTransaccionsUseCase,
  UpdateProfileUseCase as updateProfileDBUseCase,
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

const getAllCategory = new GetAllCategoryUseCase(DBRepositoryLocal, DBRepositoryLocal);
const addCategory = new AddCategoryUseCase(DBRepositoryLocal, DBRepositoryLocal);
const updateCategory = new UpdateCategoryUseCase(DBRepositoryLocal, DBRepositoryLocal);
const deleteCategory = new DeleteCategoryUseCase(DBRepositoryLocal, DBRepositoryLocal);

const getAllAccount = new GetAllAccountUseCase(DBRepositoryLocal, DBRepositoryLocal);
const addAccount = new AddAccountUseCase(DBRepositoryLocal, DBRepositoryLocal);
const updateAccount = new UpdateAccountUseCase(DBRepositoryLocal, DBRepositoryLocal);
const deleteAccount = new DeleteAccountUseCase(DBRepositoryLocal, DBRepositoryLocal);

const getAllProfileByUserOwnerID = new GetAllProfileByUserOwnerIDUseCase(
  DBRepositoryLocal,
  DBRepositoryLocal,
);
const getProfileByID = new GetProfileByIDUseCase(DBRepositoryLocal, DBRepositoryLocal);
const addProfile = new AddProfileUseCase(DBRepositoryLocal, DBRepositoryLocal);
const updateProfile = new updateProfileDBUseCase(DBRepositoryLocal, DBRepositoryLocal);
const deleteProfile = new DeleteProfileUseCase(DBRepositoryLocal, DBRepositoryLocal);

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
  getAllCategory,
  addCategory,
  updateCategory,
  deleteCategory,
  getAllAccount,
  addAccount,
  updateAccount,
  deleteAccount,
  getAllProfileByUserOwnerID,
  getProfileByID,
  addProfile,
  updateProfile,
  deleteProfile,
};
