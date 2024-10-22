import { Button, ButtonGroup, ButtonText } from "@/components/ui/button";
import {
  FormControlError,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useLogin } from "@/lib/Hooks/useLogin";
import { t } from "i18next";
import React from "react";

interface PropsRegister {
  setRegister: () => void;
}

export const RegisterUI: React.FC<PropsRegister> = ({ setRegister }) => {
  const { setEmail, setPassword, handleRegister, setConfirmPassword } = useLogin();
  return (
    <>
      <Text className="text-center text-gray-500 dark:text-gray-400">{t("registro")}</Text>
      <VStack className="w-full gap-3">
        <FormControlLabel>
          <FormControlLabelText>{t("Correo")}</FormControlLabelText>
        </FormControlLabel>
        <Input variant="outline">
          <InputField
            type="text"
            placeholder={t("Correo")}
            variant="rounded"
            onChangeText={setEmail}
          />
        </Input>
        <FormControlLabel>
          <FormControlLabelText>{t("password")}</FormControlLabelText>
        </FormControlLabel>

        <Input>
          <InputField type="password" placeholder="******" onChangeText={setPassword} />
        </Input>
        <FormControlLabel>
          <FormControlLabelText>{t("confirmar-contrasena")}</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField type="password" placeholder="******" onChangeText={setConfirmPassword} />
        </Input>
        <FormControlHelper>
          <FormControlHelperText>{t("debe-tener-al-menos-6-caracteres")}</FormControlHelperText>
        </FormControlHelper>
        <FormControlError>
          <FormControlErrorText>{t("error-de-validacion")}</FormControlErrorText>
        </FormControlError>
      </VStack>

      <ButtonGroup className="flex-col gap-3" style={{ height: "30%" }}>
        <Button className="w-full text-center" onPress={handleRegister}>
          <ButtonText className="text-center">{t("registro")}</ButtonText>
        </Button>
        <Button className="w-full text-center" variant="outline" onPress={setRegister}>
          <ButtonText className="text-center">{t("regresar-a-iniciar-sesion")}</ButtonText>
        </Button>
      </ButtonGroup>
    </>
  );
};
