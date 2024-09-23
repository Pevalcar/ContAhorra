import { Button, ButtonGroup, ButtonText } from "@/components/ui/button";
import {
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { t } from "i18next";
import React from "react";

interface PropsUITO {
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setRegister: () => void;
  handleSubmit: () => void;
  onRecoverPassword: () => void;
}

export const LoginUITow: React.FC<PropsUITO> = ({
  setPassword,
  setEmail,
  setRegister,
  handleSubmit,
  onRecoverPassword,
}) => {
  return (
    <>
      <Text className="text-center text-gray-500 dark:text-gray-400">
        {t("elije-tu-metodo-preferido-para-iniciar-sesion")}
      </Text>
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
        <FormControlError>
          <FormControlErrorText>{t("error-de-validacion")}</FormControlErrorText>
        </FormControlError>
      </VStack>
      <ButtonGroup className="flex-col gap-3" style={{ height: "30%" }}>
        <Button className="w-full text-center" onPress={handleSubmit}>
          <ButtonText className="text-center">{t("iniciar-sesion")}</ButtonText>
        </Button>
        <Button className="w-full text-center" variant="outline" onPress={setRegister}>
          <ButtonText className="text-center">{t("registro")}</ButtonText>
        </Button>
        <Button className="w-full text-center" variant="outline" onPress={onRecoverPassword}>
          <ButtonText className="text-center">{t("recuperar-contrasena")}</ButtonText>
        </Button>
      </ButtonGroup>
    </>
  );
};
