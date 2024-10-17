import { avatars } from "../configs/images";
import "../domain/entities/User";
import { useMyToast } from "./useToast";
import { useStoreSesion } from "@/lib/store";
import React from "react";

export const useProfile = () => {
  const { handleToast } = useMyToast();
  const [emailSend, setEmailSend] = React.useState(false);
  const [displayName, setDisplayName] = React.useState<string | null>(null);
  const [photoURL, setPhotoURL] = React.useState<string>("avatar_1");
  const { updateProfile, error, sendEmailVerification, user, fetchUser } = useStoreSesion(
    (state) => state,
  );
  const [showModal, setShowModal] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const fetchAndSetUser = async () => {
      await fetchUser();
      if (user) {
        setDisplayName(user?.name ?? null);

        setPhotoURL(user.photoURL ?? avatars[0]);
      }
    };

    fetchAndSetUser();
  }, [user]);

  React.useEffect(() => {
    switch (error?.message) {
      case "success-update-profile":
        handleToast("Perfecto", "tu perfil se actualizó correctamente", "success");
        break;
      default:
        break;
    }
  }, [error]);

  async function enviaremailVerificacion() {
    await sendEmailVerification();
    handleToast(
      "Verificación enviada",
      "Revísala en tu bandeja de entrada, verifica y vuelve a iniciar sesión",
      "info",
    );
    setEmailSend(true);
  }

  const handleUpdateProfile = () => {
    updateProfile(displayName ?? "", photoURL ?? "1");
  };

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
