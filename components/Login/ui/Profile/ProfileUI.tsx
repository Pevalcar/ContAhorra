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
import { useProfile } from "@/lib/Hooks/useProfile";
import { useAssets } from "expo-asset";
import { t } from "i18next";
import { MailCheck } from "lucide-react-native";
import React from "react";
import { View } from "react-native";

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
      <Heading size="2xl">{t("informacion-del-perfil")}</Heading>
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
              {t("elije-un-avatar")}{" "}
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
        <Text>{t("actualizar-informacion-del-perfil")}</Text>
        <Avatar size="2xl">
          <AvatarFallbackText>{displayName ?? t("anadir-foto")}</AvatarFallbackText>
          <AvatarImage source={{ uri: photoURL }} />
        </Avatar>
        <Button variant="outline" className="gap-2" onPress={() => setShowModal(true)}>
          <ButtonText>{t("cambiar-avatar")}</ButtonText>
        </Button>
      </VStack>
      <Text>{t("nombre-de-usuario")}</Text>
      <Input>
        <InputField value={displayName ?? ""} onChangeText={setDisplayName} />
      </Input>
      <VStack className="items-start gap-2">
        <Text>{t("correo-electronico")}</Text>
        <HStack className="gap-3">
          <Input className="flex-1" isReadOnly>
            <InputField value={user?.email ?? ""} />
          </Input>
          {user?.emailVerified ? (
            <Badge action="success">
              <BadgeText>{t("verificado")}</BadgeText>
            </Badge>
          ) : (
            <Badge action="error">
              <BadgeText>{t("no-verificado")}</BadgeText>
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
        <ButtonText>{t("guardar-cambios")}</ButtonText>
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
