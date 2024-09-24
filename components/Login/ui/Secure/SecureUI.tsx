import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { useSecureSecion } from "@/lib/Hooks/useSecure";
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
      <Heading size="2xl">Configuracion de Seguridad</Heading>
      <Text>Administrar tu contraseña y opciones de seguridad.</Text>
      <Text>Contraseña actual</Text>
      <Input>
        <InputField value={currentPassword} onChangeText={setCurrentPassword} />
      </Input>
      <Text>Nueva Contraseña</Text>
      <Input>
        <InputField value={password} onChangeText={setPassword} />
      </Input>
      <Text>Confirmar contraseña</Text>
      <Input>
        <InputField value={confirmPassword} onChangeText={setConfirmPassword} />
      </Input>
      <Button onPress={() => handleUpdatePassword()}>
        <ButtonText>Cambiar contraseña</ButtonText>
      </Button>
    </>
  );
};
