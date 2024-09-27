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
    console.log(error);
    switch (error?.code) {
      case "auth/wrong-password":
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
