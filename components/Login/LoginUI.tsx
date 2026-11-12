import { Button, ButtonText } from "../ui/button";
import { FormControl } from "../ui/form-control";
import { Heading } from "../ui/heading";
import { Text } from "../ui/text";
import { VStack } from "../ui/vstack";
import { ForgotPas } from "./ui/ForgotPas";
import { LoginUITow } from "./ui/LoginUITOW";
import { RegisterUI } from "./ui/RegisterUI";
import { useLogin } from "@/lib/Hooks/useLogin";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { router } from "expo-router";
import { t } from "i18next";
import React from "react";
import { View } from "react-native";

interface Props {}

export const LoginUI: React.FC<Props> = () => {
  const {
    loagin: isLoading,
    error,
    register,
    recorePassword,
    setRegister,
    setRecoverPasswords,
    getGoogleCredential,
  } = useLogin();

  const UI = React.useMemo(() => {
    if (register) {
      return <RegisterUI setRegister={setRegister} />;
    }
    if (recorePassword) {
      return <ForgotPas setRecoverPasswords={setRecoverPasswords} />;
    }
    return <LoginUITow onRecoverPassword={setRecoverPasswords} setRegister={setRegister} />;
  }, [register, recorePassword]);

  return (
    <View>
      <Button variant="outline" onPress={() => router.back()}>
        <ButtonText>{t("back")}</ButtonText>
      </Button>

      <VStack className="h-full w-full justify-center gap-3">
        <Heading className="text-center font-bold" size="4xl">
          ContaAhorra
        </Heading>
        <VStack className="gap-3">
          <FormControl
            className="w-full justify-between gap-4 px-4 py-4"
            isInvalid={error ? true : false}>
            {UI}
          </FormControl>
          <VStack>
            <VStack className="justify-center text-xs">
              <Text className="bg-background text-muted-foreground px-2 text-center">
                {t("o-continue-con")}
              </Text>
            </VStack>
          </VStack>
          <View className="mt-4 flex-row items-center justify-center gap-3">
            <GoogleSigninButton
              size={GoogleSigninButton.Size.Icon}
              onPress={getGoogleCredential}
              disabled={isLoading}
            />
          </View>
        </VStack>
      </VStack>
    </View>
  );
};
