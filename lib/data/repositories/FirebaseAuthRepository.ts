// import { auth } from "@/lib/configs/firebaseConfig";
// import User from "@/lib/domain/entities/User";
// import { FirebaseControlErrors } from "@/lib/domain/error/FirebaseControErrors";
// import AuthRepositoryI from "@/lib/domain/repositories/AuthRepositoryI";
// import {
//   GoogleSignin,
//   isErrorWithCode,
//   statusCodes,
// } from "@react-native-google-signin/google-signin";
// import Constants from "expo-constants";
// import { FirebaseError } from "firebase/app";
// import {
//   EmailAuthProvider,
//   GoogleAuthProvider,
//   createUserWithEmailAndPassword,
//   reauthenticateWithCredential,
//   sendEmailVerification,
//   sendPasswordResetEmail,
//   signInWithCredential,
//   signInWithEmailAndPassword,
//   signOut,
//   updatePassword,
//   updateProfile,
// } from "firebase/auth";

// export default class FirebaseAuthRepository extends AuthRepositoryI {
//   async login(email: string, password: string) {
//     //in case of error, return null and error message

//     const usercredential = await signInWithEmailAndPassword(auth, email, password).catch(
//       (error: FirebaseError) => {
//         throw FirebaseControlErrors.getError(error.code);
//       },
//     );
//     if (!usercredential.user) {
//       return null;
//     }
//     const user = User.fromFirebaseUser(usercredential.user);
//     return user;
//   }
//   async register(email: string, password: string) {
//     const usercredential = await createUserWithEmailAndPassword(auth, email, password).catch(
//       (error: FirebaseError) => {
//         throw FirebaseControlErrors.getError(error.code);
//       },
//     );
//     if (!usercredential.user) {
//       return null;
//     }
//     const user = User.fromFirebaseUser(usercredential.user);
//     return user;
//   }
//   async recoverPassword(email: string) {
//     await sendPasswordResetEmail(auth, email).catch((error) => {
//       throw FirebaseControlErrors.getError(error.code);
//     });
//   }
//   async sendEmailVerification() {
//     if (!auth.currentUser) {
//       throw FirebaseControlErrors.getError("session-no-iniciada");
//     }
//     await sendEmailVerification(auth.currentUser).catch((error) => {
//       throw FirebaseControlErrors.getError(error.code);
//     });
//   }

//   async updatePassword(password: string, newPassword: string) {
//     if (!auth.currentUser) {
//       throw FirebaseControlErrors.getError("session-no-iniciada");
//     }
//     try {
//       const userCredential = await EmailAuthProvider.credential(
//         auth.currentUser?.email ?? "",
//         password,
//       );
//       const result = await reauthenticateWithCredential(auth.currentUser, userCredential);
//       if (result.user) {
//         await updatePassword(result.user, newPassword).catch((error) => {
//           throw FirebaseControlErrors.getError(error.code);
//         });
//       }
//     } catch (error: any) {
//       throw FirebaseControlErrors.getError(error.code as any);
//     }
//   }
//   async updateProfile(displayName: string, photoURL: string) {
//     if (!auth.currentUser) {
//       throw FirebaseControlErrors.getError("session-no-iniciada");
//     }
//     updateProfile(auth.currentUser, {
//       displayName,
//       photoURL,
//     }).catch((error) => {
//       throw FirebaseControlErrors.getError(error.code);
//     });
//   }
//   async logout() {
//     await signOut(auth);
//     await GoogleSignin.signOut();
//   }

//   async signInWhitGoogle() {
//     GoogleSignin.configure({
//       webClientId: Constants.expoConfig?.extra?.google.webClientId,
//       offlineAccess: true,
//     });
//     try {
//       await GoogleSignin.hasPlayServices();
//       const response = await GoogleSignin.signIn();
//       if (response.data?.idToken) {
//         const tokes = await GoogleSignin.getTokens();
//         const credentials = GoogleAuthProvider.credential(tokes.idToken, tokes.accessToken);
//         const currentUser = await signInWithCredential(auth, credentials);
//         if (currentUser) {
//           const user = User.fromFirebaseUser(currentUser.user);
//           return user;
//         }
//       }
//     } catch (error) {
//       if (isErrorWithCode(error)) {
//         // console.log("error" + error.code);

//         switch (error.code) {
//           case statusCodes.IN_PROGRESS:
//             // operation (eg. sign in) already in progress
//             break;
//           case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
//             // Android only, play services not available or outdated
//             break;
//           default:
//           // some other error happened
//         }
//       } else {
//         // an error that's not related to google sign in occurred
//       }
//     }
//     return null;
//   }

//   async fetchUser(): Promise<User | null> {
//     const credentials = auth.currentUser;
//     if (credentials) {
//       const user = User.fromFirebaseUser(credentials);
//       return user;
//     } else {
//       return null;
//     }
//   }
// }
