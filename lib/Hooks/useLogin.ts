import { DEVELOPMENT } from "../configs/config";
import { useSession } from "../providers/ctx";
import { useMyToast } from "./useToast";
import React from "react";
import { useTranslation } from "react-i18next";

export const useLogin = () => {
  const { error, signIn, registrar, recoverPassword } = useSession();
  const [loagin, setLoagin] = React.useState(false);
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
      setLoagin(false);
      setMyError(true);

      switch (error.message) {
        case "error-usuario-no-encontrado":
          handleToast(t("error"), t("error-usuario-no-encontrado"), "error");
          break;
        case "error-contrasena":
          handleToast(t("error"), t("error-contrasena"), "error");
          break;
        case "error-email":
          handleToast(t("error"), t("error-email"), "error");
          break;
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
        case "email-ya-esta-en-uso":
          handleToast(t("error"), t("email-ya-esta-en-uso"), "info");
          break;
        case "correo-no-encontrado":
          handleToast(t("error"), t("correo-no-encontrado"), "error");
          break;
        default:
          handleToast(t("error"), error.message, "error");
          break;
      }
    }
  }, [error]);

  function handleSubmit() {
    setLoagin(true);
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
    setLoagin(true);
    registrar(email, password);
  }
  function handleRecoverPassword() {
    setLoagin(true);
    recoverPassword(email);
  }
  function setRecoverPasswords() {
    setRecoverPassword(!recorePassword);
  }
  function crearUsuarioTest() {
    setLoagin(true);
    registrar("test@test.com", "123456");
  }
  function iniciarSesionTest() {
    setLoagin(true);
    signIn("test@test.com", "123456");
  }

  if (DEVELOPMENT) {
    return {
      loagin,
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
    };
  }

  return {
    loagin,
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
  };
};
