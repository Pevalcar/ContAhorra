const SupaBaseControlErrors = {
  "Invalid login credentials": "error-credenciales-invalidos",
  "auth/wrong-password": "error-contrasena",
  "missing email or phone": "error-email",
  "auth/email-already-in-use": "email-ya-esta-en-uso",
  "auth/missing-email": "correo-no-encontrado",
  "session-no-iniciada": "session-no-iniciada",
  Cancelled: "Cancelled",
  "In progress": "In progress",
  "Play services not available": "Play services not available",
  "Some other error": "Some other error",
};

export class SupaBaseControlError {
  static getError(error: any) {
    console.info("error supabase Control error " + error);
    return new Error(SupaBaseControlErrors[error as keyof typeof SupaBaseControlErrors]);
  }
}
