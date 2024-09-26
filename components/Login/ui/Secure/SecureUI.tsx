import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { useSecureSecion } from "@/lib/Hooks/useSecure";
import { t } from "i18next";
import React from "react";

export const SeguridadUI = () => {
  const {
    handleUpdatePassword,
    setConfirmPassword,
    setPassword,
    setCurrentPassword,
    currentPassword,
    confirmPassword,
    password,
  } = useSecureSecion();
  return (
    <>
      <Heading size="2xl">{t("configuracion-de-seguridad")}</Heading>
      <Text>{t("administrar-tu-contrasena-y-opciones-de-seguridad")}</Text>
      <Text>{t("contrasena-actual")}</Text>
      <Input>
        <InputField value={currentPassword} onChangeText={setCurrentPassword} />
      </Input>
      <Text>{t("nueva-contrasena")}</Text>
      <Input>
        <InputField value={password} onChangeText={setPassword} />
      </Input>
      <Text>{t("confirmar-contrasena-0")}</Text>
      <Input>
        <InputField value={confirmPassword} onChangeText={setConfirmPassword} />
      </Input>
      <Button onPress={() => handleUpdatePassword()}>
        <ButtonText>{t("cambiar-contrasena")}</ButtonText>
      </Button>
    </>
  );
};
