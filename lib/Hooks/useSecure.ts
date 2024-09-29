import { useSession } from "../providers/ctx";
import { useMyToast } from "./useToast";
import React from "react";

export const useSecureSecion = () => {
  const { handleToast } = useMyToast();
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { updatePassword, error } = useSession();

  React.useEffect(() => {
    switch (error?.message) {
      case "error-contrasena":
        handleToast("Contraseña actual", "Verifica que la contraseña actual sea correcta", "error");
        break;
      case "success-update-password": {
        updatesucesCleanInputs();
        handleToast("Perfecto", "tu contraseña se a actualizado", "success");
        break;
      }
      default:
        break;
    }
  }, [error]);

  function updatesucesCleanInputs() {
    setCurrentPassword("");
    setConfirmPassword("");
    setPassword("");
  }

  function handleUpdatePassword() {
    if (currentPassword === "") {
      handleToast("Contraseña actual", "Ingresa la contraseña actual", "error");
      return;
    }
    if (password !== confirmPassword) {
      handleToast("Contraseña no coincide", "Verifica que los campos coincidan", "error");
      return;
    }
    if (password.length < 6) {
      handleToast(
        "Contraseña demasiado corta",
        "La contraseña debe tener al menos 6 caracteres",
        "info",
      );
      return;
    }
    if (password === currentPassword) {
      handleToast(
        "Contraseña igual a la actual",
        "Verifica que la contraseña no sea igual a la actual",
        "info",
      );
      return;
    }
    updatePassword(currentPassword, password);
  }
  return {
    handleUpdatePassword,
    setConfirmPassword,
    setPassword,
    setCurrentPassword,
    currentPassword,
    confirmPassword,
    password,
  };
};
