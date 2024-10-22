import {
  AlertCircleIcon,
  Box,
  Button,
  ButtonText,
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
  HStack,
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
import { AppColorsCategorias } from "@/lib/configs/Colors";
import { avatars } from "@/lib/configs/images";
import { usePerfilesStore } from "@/lib/store";
import { PervilValidationSquema } from "@/lib/validations/perfilValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Image, Pressable, StyleSheet, View } from "react-native";

interface Props {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  ref: React.RefObject<any>;
}

const createProfileModal: React.FC<Props> = ({ showModal, setShowModal }) => {
  const { t } = useTranslation();
  const ref = React.useRef<any>(null);
  const {
    addPerfil,
    avatar,
    setAvatar,
    setName,
    name: perfilname,
    color: selectColor,
    setColor,
  } = usePerfilesStore((state) => state);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: perfilname,
    },
    resolver: yupResolver(PervilValidationSquema),
  });

  const onSave = React.useCallback(({ name }: any) => {
    setName(name);
    addPerfil();
    reset({
      name: perfilname,
    });
    setShowModal(false);
  }, []);

  return (
    <View>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="md">
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="md" className="text-typography-950">
              {t("selecciona-un-perfil")}
            </Heading>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            <VStack>
              <Controller
                control={control}
                name="name"
                render={({ field: { onBlur, onChange, value } }) => (
                  <FormControl isRequired isInvalid={errors.name?.message !== undefined}>
                    <FormControlLabel>
                      <FormControlLabelText>{t("nombre")}</FormControlLabelText>
                    </FormControlLabel>
                    <Input className="mb-4">
                      <InputField
                        value={value}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        ref={ref}
                        autoFocus
                      />
                    </Input>
                    <FormControlError>
                      <FormControlErrorIcon as={AlertCircleIcon} />
                      <FormControlErrorText>{t(errors.name?.message)}</FormControlErrorText>
                    </FormControlError>
                  </FormControl>
                )}
              />
            </VStack>
            <VStack className="w-full flex-row flex-wrap items-center justify-center gap-2">
              {avatars.map((ava, index) => {
                return (
                  <Avatart key={index} avatar={ava} selected={ava === avatar} onPress={setAvatar} />
                );
              })}
            </VStack>
            <Heading>Color</Heading>
            <HStack className="flex flex-wrap justify-between gap-1 rounded-md border border-background-500 bg-background-300 p-2">
              {AppColorsCategorias.map((color, i) => {
                return (
                  <Pressable onPress={() => setColor(color)} key={i}>
                    <Box
                      className={selectColor === color ? "border-4 border-green-600" : ""}
                      style={{
                        backgroundColor: color,
                        width: 30,
                        height: 30,
                        borderRadius: 100,
                      }}
                    />
                  </Pressable>
                );
              })}
            </HStack>
          </ModalBody>

          <ModalFooter>
            <Button action="positive" onPress={handleSubmit(onSave)}>
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
  ...props
}: {
  avatar: string;
  onPress: (avatar: string) => void;
  selected?: boolean;
}) {
  return (
    <Pressable onPress={() => onPress(avatar)} {...props}>
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
