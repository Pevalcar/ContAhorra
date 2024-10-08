import {
  Button,
  ButtonText,
  Heading,
  Input,
  InputField,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  VStack,
} from "@/components/ui";
import { avatars } from "@/lib/configs/images";
import { usePerfilesStore } from "@/lib/store";
import { t } from "i18next";
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

interface Props {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  ref: React.RefObject<any>;
}

const createProfileModal: React.FC<Props> = ({ showModal, setShowModal, ref }) => {
  const { addPerfil, name, avatar, setAvatar, setName } = usePerfilesStore((state) => state);

  const onSave = React.useCallback(() => {
    addPerfil();
    setShowModal(false);
  }, [name, avatar]);

  return (
    <View>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} finalFocusRef={ref} size="md">
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="md" className="text-typography-950">
              {t("selecciona-un-perfil")}
            </Heading>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            <VStack className="w-full flex-row flex-wrap items-center justify-center gap-2">
              {avatars.map((ava, index) => {
                return (
                  <Avatart key={index} avatar={ava} selected={ava === avatar} onPress={setAvatar} />
                );
              })}
            </VStack>
            <VStack>
              <Heading size="sm" className="text-typography-950">
                {t("nombre")}
              </Heading>
              <Input className="mb-4">
                <InputField placeholder="Nombre" value={name} onChangeText={setName} />
              </Input>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onPress={onSave}>
              <ButtonText>{t("save")}</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </View>
  );
};

export const CreateProfileModal = React.memo(createProfileModal);

const Avatart = React.memo(function Avatart({
  avatar,
  selected,
  onPress,
  key,
}: {
  avatar: string;
  onPress: (avatar: string) => void;
  selected?: boolean;
  key: number;
}) {
  return (
    <Pressable onPress={() => onPress(avatar)} key={key}>
      <Image source={{ uri: avatar }} style={styles.preAvatar} alt="aslgo" />
      <Image
        source={{ uri: avatar }}
        alt="aslgo"
        style={selected ? styles.avatarSelected : styles.avatar}
      />
    </Pressable>
  );
});

const styles = StyleSheet.create({
  preAvatar: {
    width: 45,
    height: 45,
    tintColor: "gray",
    borderRadius: 100,
  },
  avatar: { width: 45, height: 45, position: "absolute", opacity: 0.3, borderRadius: 100 },
  avatarSelected: {
    width: 45,
    height: 45,
    position: "absolute",
    opacity: 1,
    borderRadius: 100,
    borderColor: "green",
    borderWidth: 2,
  },
});
