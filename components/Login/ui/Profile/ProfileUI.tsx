import { Avatar, AvatarFallbackText, AvatarImage } from "@/components/ui/avatar";
import { Badge, BadgeText } from "@/components/ui/badge";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField } from "@/components/ui/input";
import { Modal, ModalBackdrop, ModalBody, ModalContent, ModalHeader } from "@/components/ui/modal";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useMyToast } from "@/lib/Hooks/useToast";
import { useSession } from "@/lib/sesionprovider/ctx";
import { useConstsStore } from "@/lib/store/ConstsStore";
import { useAssets } from "expo-asset";
import { MailCheck } from "lucide-react-native";
import React from "react";
import { View } from "react-native";

const useProfile = () => {
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

interface PerfilProps {}
export const PerfilUI: React.FC<PerfilProps> = () => {
  const {
    handleUpdateProfile,
    enviaremailVerificacion,
    displayName,
    photoURL,
    showModal,
    setShowModal,
    ref,
    emailSend,
    setPhotoURL,
    user,
    setDisplayName,
  } = useProfile();

  return (
    <>
      <Heading size="2xl">Información del Perfil</Heading>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        finalFocusRef={ref}
        size="md">
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="md" className="text-typography-950">
              Invite your team
            </Heading>
          </ModalHeader>
          <ModalBody>
            <GridItemUI
              onPress={(index: string) => {
                setShowModal(false);
                setPhotoURL(index);
              }}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
      <VStack className="items-center gap-3">
        <Text> Actualizar información del perfil</Text>
        <Avatar size="2xl">
          <AvatarFallbackText>{displayName ?? "Añadir foto"}</AvatarFallbackText>
          <AvatarImage source={{ uri: photoURL }} />
        </Avatar>
        <Button variant="outline" className="gap-2" onPress={() => setShowModal(true)}>
          <ButtonText>Cambiar avatar</ButtonText>
        </Button>
      </VStack>
      <Text>Nombre de usuario</Text>
      <Input>
        <InputField value={displayName ?? ""} onChangeText={setDisplayName} />
      </Input>
      <VStack className="items-start gap-2">
        <Text>Correo electrónico</Text>
        <HStack className="gap-3">
          <Input className="flex-1" isReadOnly>
            <InputField value={user?.email ?? ""} />
          </Input>
          {user?.emailVerified ? (
            <Badge action="success">
              <BadgeText>Verificado</BadgeText>
            </Badge>
          ) : (
            <Badge action="error">
              <BadgeText>No verificado</BadgeText>
            </Badge>
          )}
        </HStack>
        {!user?.emailVerified && (
          <Button
            variant="outline"
            className="gap-2"
            isDisabled={emailSend}
            onPress={async () => enviaremailVerificacion()}>
            <ButtonIcon as={MailCheck} />
            <ButtonText>Verificar</ButtonText>
          </Button>
        )}
      </VStack>
      <Button onPress={handleUpdateProfile}>
        <ButtonText>Guardar cambios</ButtonText>
      </Button>
    </>
  );
};

interface gridItemProps {
  onPress: (uri: string) => void;
}

const GridItemUI: React.FC<gridItemProps> = ({ onPress }) => {
  const [avatarts] = useAssets([
    require("@/assets/images/avatars/avatar-1.jpg"),
    require("@/assets/images/avatars/avatar-2.jpg"),
    require("@/assets/images/avatars/avatar-3.jpg"),
    require("@/assets/images/avatars/avatar-4.jpg"),
    require("@/assets/images/avatars/avatar-5.jpg"),
    require("@/assets/images/avatars/avatar-6.jpg"),
    require("@/assets/images/avatars/avatar-7.jpg"),
    require("@/assets/images/avatars/avatar-8.jpg"),
    require("@/assets/images/avatars/avatar-9.jpg"),
    require("@/assets/images/avatars/avatar-10.jpg"),
    require("@/assets/images/avatars/avatar-11.jpg"),
    require("@/assets/images/avatars/avatar-12.jpg"),
    require("@/assets/images/avatars/avatar-13.jpg"),
  ]);

  const onPressAvatar = (index: number) => {
    if (avatarts) {
      onPress(avatarts[index].uri);
    }
  };

  return (
    avatarts && (
      <View className="w-full flex-row flex-wrap gap-3">
        {avatarts.map((avatar, index) => {
          return <MyAvatarUI key={index} onPress={() => onPressAvatar(index)} avatarts={avatar} />;
        })}
      </View>
    )
  );
};

interface AvatarProps {
  onPress: () => void;
  avatarts: any;
}

const MyAvatarUI: React.FC<AvatarProps> = ({ onPress, avatarts }) => {
  return (
    <Pressable onPress={() => onPress()}>
      <Avatar size="lg">
        <AvatarFallbackText>Añadir foto</AvatarFallbackText>
        <AvatarImage source={avatarts} />
      </Avatar>
    </Pressable>
  );
};
