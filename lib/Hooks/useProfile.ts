import { useSession } from "../sesionprovider/ctx";
import { useConstsStore } from "../store/ConstsStore";
import { useMyToast } from "./useToast";
import React from "react";

export const useProfile = () => {
  const { fetchUser, user } = useConstsStore((state) => state);

  const { handleToast } = useMyToast();
  const [emailSend, setEmailSend] = React.useState(false);
  const [displayName, setDisplayName] = React.useState<string | null>(null);
  const [photoURL, setPhotoURL] = React.useState<string>();
  const { updateProfile, error } = useSession();
  const [showModal, setShowModal] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    fetchUser();
  }, []);
  const { sendEmailVerification } = useSession();

  const handleUpdateProfile = () => {
    updateProfile(displayName ?? "", photoURL ?? "1");
  };
  React.useEffect(() => {
    console.log(error);
    switch (error?.code) {
      case "success-update-profile":
        handleToast("Perfecto", "tu perfil se actualizó correctamente", "success");
        break;
      default:
        break;
    }
  }, [error]);

  React.useEffect(() => {
    setDisplayName(user?.displayName ?? null);
    setPhotoURL(user?.photoURL ?? "");
  }, [user]);

  async function enviaremailVerificacion() {
    await sendEmailVerification();
    handleToast(
      "Verificación enviada",
      "Revísala en tu bandeja de entrada, verifica y vuelve a iniciar sesión",
      "info",
    );
    setEmailSend(true);
  }

  return {
    handleUpdateProfile,
    enviaremailVerificacion,
    displayName,
    photoURL,
    showModal,
    setShowModal,
    ref,
    emailSend,
    setEmailSend,
    setPhotoURL,
    user,
    setDisplayName,
  };
};
