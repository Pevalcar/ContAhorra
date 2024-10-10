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
  AddGoupUseCase,
  DeleteGoupUseCase,
  GetAllGoupUseCase,
  UpdateGoupUseCase,
} from "@/lib/domain/usecases/Groups";
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
const DBReposirotyRemote = new TransaccionLocalRepository(LOCAL_DB_NAME);

const addTransaccion = new AddTransaccionUseCase(DBRepositoryLocal, DBReposirotyRemote);
const deleteTransaccion = new DeleteTransaccionUseCase(DBRepositoryLocal, DBReposirotyRemote);
const getAllTransaccion = new GetAllUseCase(DBRepositoryLocal, DBReposirotyRemote);
const getTransactionsByDateRang = new GetTransactionsByDateRangeUseCase(
  DBRepositoryLocal,
  DBReposirotyRemote,
);
const updateTransaccion = new UpdateTransaccionsUseCase(DBRepositoryLocal, DBReposirotyRemote);
const getTotalTransactionByDateRange = new GetTotalTransactionsByDateRangeUseCase(
  DBRepositoryLocal,
  DBReposirotyRemote,
);

const getAllCategory = new GetAllCategoryUseCase(DBRepositoryLocal, DBReposirotyRemote);
const addCategory = new AddCategoryUseCase(DBRepositoryLocal, DBReposirotyRemote);
const updateCategory = new UpdateCategoryUseCase(DBRepositoryLocal, DBReposirotyRemote);
const deleteCategory = new DeleteCategoryUseCase(DBRepositoryLocal, DBReposirotyRemote);

const getAllAccount = new GetAllAccountUseCase(DBRepositoryLocal, DBReposirotyRemote);
const addAccount = new AddAccountUseCase(DBRepositoryLocal, DBReposirotyRemote);
const updateAccount = new UpdateAccountUseCase(DBRepositoryLocal, DBReposirotyRemote);
const deleteAccount = new DeleteAccountUseCase(DBRepositoryLocal, DBReposirotyRemote);

const getAllProfileByUserOwnerID = new GetAllProfileByUserOwnerIDUseCase(
  DBRepositoryLocal,
  DBReposirotyRemote,
);
const getProfileByID = new GetProfileByIDUseCase(DBRepositoryLocal, DBReposirotyRemote);
const addProfile = new AddProfileUseCase(DBRepositoryLocal, DBReposirotyRemote);
const updateProfile = new updateProfileDBUseCase(DBRepositoryLocal, DBReposirotyRemote);
const deleteProfile = new DeleteProfileUseCase(DBRepositoryLocal, DBReposirotyRemote);

//Groups

const getAllGroup = new GetAllGoupUseCase(DBRepositoryLocal, DBReposirotyRemote);
const addGroup = new AddGoupUseCase(DBRepositoryLocal, DBReposirotyRemote);
const updateGroup = new UpdateGoupUseCase(DBRepositoryLocal, DBReposirotyRemote);
const deleteGroup = new DeleteGoupUseCase(DBRepositoryLocal, DBReposirotyRemote);

export {
  getAllGroup,
  addGroup,
  updateGroup,
  deleteGroup,
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
