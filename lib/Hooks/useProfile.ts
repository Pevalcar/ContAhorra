import { avatars } from "../configs/images";
import { useSession } from "../providers/ctx";
import { useConstsStore } from "../store/ConstsStore";
import { useMyToast } from "./useToast";
import { useAssets } from "expo-asset";
import React from "react";

export const useProfile = () => {
  const fetchUser = useConstsStore((state) => state.fetchUser);
  const user = useConstsStore((state) => state.user);
  const [avatarts] = useAssets(avatars);
  const { handleToast } = useMyToast();
  const [emailSend, setEmailSend] = React.useState(false);
  const [displayName, setDisplayName] = React.useState<string | null>(null);
  const [photoURL, setPhotoURL] = React.useState<string>();
  const { updateProfile, error } = useSession();
  const [showModal, setShowModal] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const fetchAndSetUser = async () => {
      await fetchUser();
      if (user) {
        setDisplayName(user?.name ?? null);
        if (avatarts) {
          setPhotoURL(user?.photoURL ?? avatarts[0]?.uri);
        }
      }
    };

    fetchAndSetUser();
  }, [avatarts]);
  const { sendEmailVerification } = useSession();

  const handleUpdateProfile = () => {
    updateProfile(displayName ?? "", photoURL ?? "1");
  };
  React.useEffect(() => {
    switch (error?.message) {
      case "success-update-profile":
        handleToast("Perfecto", "tu perfil se actualizó correctamente", "success");
        break;
      default:
        break;
    }
  }, [error]);

  React.useEffect(() => {
    setDisplayName(user?.name ?? null);
    if (avatarts) {
      setPhotoURL(user?.photoURL ?? avatarts[0]?.uri);
    }
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
