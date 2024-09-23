import { Button, ButtonGroup, ButtonText } from "@/components/ui/button";
import { FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { t } from "i18next";
import React from "react";

interface Props {
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  handleRecoverPassword: () => void;
  setRecoverPasswords: () => void;
}

export const ForgotPas: React.FC<Props> = ({
  setEmail,
  handleRecoverPassword,
  setRecoverPasswords,
}) => {
  return (
    <>
      <Text className="text-center text-gray-500 dark:text-gray-400">
        {t("recuperar-contrasena")}
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
      </VStack>
      <ButtonGroup className="flex-col gap-3" style={{ height: "30%" }}>
        <Button className="w-full text-center" onPress={handleRecoverPassword}>
          <ButtonText className="text-center">{t("recuperrar-contrasena")}</ButtonText>
        </Button>
        <Button className="w-full text-center" variant="outline" onPress={setRecoverPasswords}>
          <ButtonText className="text-center">{t("regresar-a-iniciar-sesion")}</ButtonText>
        </Button>
      </ButtonGroup>
    </>
  );
};
