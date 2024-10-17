// // switch (error.message) {
//         case "auth/user-not-found":
//           handleToast(t("error"), t("error-usuario-no-encontrado"), "error");
//           break;
//         case "auth/wrong-password":
//           handleToast(t("error"), t("error-contrasena"), "error");
//           break;
//         case "auth/invalid-email":
//           handleToast(t("error"), t("error-email"), "error");
//           break;
//         case "success-login": {
//           handleToast(t("success"), t("success-login"), "success");
//           setMyError(false);
//           break;
//         }
//         case "success-register": {
//           handleToast(t("success"), t("success-register"), "success");
//           setRegisterUi(false);
//           setMyError(false);
//           break;
//         }
//         case "auth/email-already-in-use":
//           handleToast(t("error"), t("email-ya-esta-en-uso"), "info");
//           break;
//         case "auth/missing-email":
//           handleToast(t("error"), t("correo-no-encontrado"), "error");

//           break;
const FirebaseControErrors = {
  "auth/user-not-found": "error-usuario-no-encontrado",
  "auth/wrong-password": "error-contrasena",
  "auth/invalid-email": "error-email",
  "auth/email-already-in-use": "email-ya-esta-en-uso",
  "auth/missing-email": "correo-no-encontrado",
  "session-no-iniciada": "session-no-iniciada",
};

export class FirebaseControlErrors {
  static getError(error: any) {
    return new Error(FirebaseControErrors[error as keyof typeof FirebaseControErrors]);
  }
}
