import { Button, ButtonIcon, ButtonText } from "../ui/button";
import { Center } from "../ui/center";
import { FormControl } from "../ui/form-control";
import { Heading } from "../ui/heading";
import { Spinner } from "../ui/spinner";
import { Text } from "../ui/text";
import { VStack } from "../ui/vstack";
import { ForgotPas } from "./ui/ForgotPas";
import { LoginUITow } from "./ui/LoginUITOW";
import { RegisterUI } from "./ui/RegisterUI";
import { useLogin } from "@/lib/Hooks/useLogin";
import { DEVELOPMENT } from "@/lib/configs/config";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { router } from "expo-router";
import { t } from "i18next";
import { Box, Facebook, Github, Twitter } from "lucide-react-native";
import React from "react";
import { View } from "react-native";

interface Props {}
//TODO reparar el loading mode
export const LoginUI: React.FC<Props> = () => {
  const {
    loagin,
    error,
    register,
    recorePassword,
    setRegister,
    crearUsuarioTest,
    iniciarSesionTest,
    setRecoverPasswords,
    getGoogleCredential,
  } = useLogin();
  const UI = React.useMemo(() => {
    if (loagin) {
      return (
        <Box className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-slate-500/50">
          <Center className="flex flex-col items-center justify-center gap-3">
            <Spinner />
          </Center>
        </Box>
      );
    }
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
            style={
              DEVELOPMENT
                ? {
                    height: "50%",
                  }
                : {
                    height: "65%",
                  }
            }
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
            <GoogleSigninButton size={GoogleSigninButton.Size.Icon} onPress={getGoogleCredential} />
            <Button variant="outline">
              <ButtonIcon as={Facebook} className="h-4 w-4" />
            </Button>
            <Button variant="outline">
              <ButtonIcon as={Twitter} className="h-4 w-4" />
            </Button>
            <Button variant="outline">
              <ButtonIcon as={Github} className="h-4 w-4" />
            </Button>
          </View>
          {DEVELOPMENT && (
            <VStack className="items-center gap-5 border-t">
              <Heading size="lg" className="text-center font-bold">
                Desarrollo - Usuario test "la ui optimizada para modo preview"
              </Heading>
              <Button variant="outline" onPress={crearUsuarioTest}>
                <ButtonText>Crear usuario test</ButtonText>
              </Button>
              <Button variant="solid" onPress={iniciarSesionTest}>
                <ButtonText>iniciar sesion test</ButtonText>
              </Button>
            </VStack>
          )}
        </VStack>
      </VStack>
    </View>
  );
};
