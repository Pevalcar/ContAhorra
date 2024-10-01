import { DEVELOPMENT } from "../configs/config";
import { useStoreSesion } from "../providers/ctx";
import { useMyToast } from "./useToast";
import React from "react";
import { useTranslation } from "react-i18next";

export const useLogin = () => {
  const { error, signIn, registrar, recoverPassword, getGoogleCredential, isLoading } =
    useStoreSesion((state) => state);
  const [confimPassword, setConfirmPassword] = React.useState("");
  const [registerUi, setRegisterUi] = React.useState(false);
  const { t } = useTranslation();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { handleToast } = useMyToast();
  const [myError, setMyError] = React.useState(false);
  const [recorePassword, setRecoverPassword] = React.useState(false);

  React.useEffect(() => {
    setMyError(false);
  }, []);

  React.useEffect(() => {
    if (error) {
      setMyError(true);

      switch (error.message) {
        case "success-login": {
          handleToast(t("success"), t("success-login"), "success");
          setMyError(false);
          break;
        }
        case "success-register": {
          handleToast(t("success"), t("success-register"), "success");
          setRegisterUi(false);
          setMyError(false);
          break;
        }
        case "success-google-auth":
          handleToast(t("success"), t("success-google-auth"), "success");
          setMyError(false);
          break;
        case "email-ya-esta-en-uso":
          handleToast(t("error"), t("email-ya-esta-en-uso"), "info");
          break;
        case "error-usuario-no-encontrado":
          handleToast(t("error"), t("error-usuario-no-encontrado"), "error");
          break;
        case "error-contrasena":
          handleToast(t("error"), t("error-contrasena"), "error");
          break;
        case "error-email":
          handleToast(t("error"), t("error-email"), "error");
          break;
        case "correo-no-encontrado":
          handleToast(t("error"), t("correo-no-encontrado"), "error");
          break;
        case "error-credenciales-invalidos":
          handleToast(t("error"), t("error-credenciales-invalidos"), "error");
          break;
        case "Cancelled":
          handleToast(t("error"), t("Cancelled"), "error");
          break;
        case "In progress":
          handleToast(t("error"), t("In progress"), "error");
          break;
        case "Play services not available":
          handleToast(t("error"), t("Play services not available"), "error");
          break;
        case "Some other error":
          handleToast(t("error"), t("Some other error"), "error");
          break;
        default:
          handleToast(t("error"), error.message, "error");
          break;
      }
    }
  }, [error]);

  function handleSubmit() {
    DEVELOPMENT && console.log("enviando a " + email + " con contraseña " + password);
    signIn(email, password);
  }
  function setRegisters() {
    setPassword("");
    setConfirmPassword("");
    setMyError(false);
    setRegisterUi(!registerUi);
  }
  function handleRegister() {
    if (password !== confimPassword || password.length < 6) {
      setMyError(true);
      handleToast(t("error"), t("error-contrasena"), "error");
      return;
    }
    registrar(email, password);
  }
  function handleRecoverPassword() {
    recoverPassword(email);
  }
  function setRecoverPasswords() {
    setRecoverPassword(!recorePassword);
  }
  function crearUsuarioTest() {
    registrar("perroaa94@gmail.com", "123456");
  }
  function iniciarSesionTest() {
    signIn("perroaa94@gmail.com", "123456");
  }

  if (DEVELOPMENT) {
    return {
      loagin: isLoading,
      setEmail,
      setPassword,
      handleSubmit,
      error: myError,
      register: registerUi,
      recorePassword,
      setRegister: setRegisters,
      handleRegister,
      setConfirmPassword,
      crearUsuarioTest,
      setRecoverPasswords,
      iniciarSesionTest,
      handleRecoverPassword,
      getGoogleCredential,
    };
  }

  return {
    loagin: isLoading,
    setEmail,
    setPassword,
    handleSubmit,
    error: myError,
    register: registerUi,
    recorePassword,
    setRegister: setRegisters,
    handleRegister,
    setConfirmPassword,
    handleRecoverPassword,
    setRecoverPasswords,
    getGoogleCredential,
  };
};
