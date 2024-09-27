import FirebaseAuthRepository from "../../data/repositories/FirebaseAuthRepository";
import LoginUseCase from "@/lib/usecases/LoginUseCase";

const firebaseAuthRepository = new FirebaseAuthRepository();

const loginUseCase = new LoginUseCase(firebaseAuthRepository);

export { loginUseCase };
