import { Avatar } from "../ui/avatar";
import { Badge, BadgeText } from "../ui/badge";
import { Button, ButtonIcon, ButtonText } from "../ui/button";
import { Card } from "../ui/card";
import { Heading } from "../ui/heading";
import { HStack } from "../ui/hstack";
import { Input, InputField } from "../ui/input";
import { Text } from "../ui/text";
import { useToast } from "../ui/toast";
import { VStack } from "../ui/vstack";
import { useMyToast } from "@/lib/Hooks/useToast";
import { useSession } from "@/lib/sesionprovider/ctx";
import { useConstsStore } from "@/lib/store/ConstsStore";
import { router } from "expo-router";
import { User } from "firebase/auth";
import { t } from "i18next";
import { Camera, MailCheck } from "lucide-react-native";
import React from "react";

interface Props {}

export const UserInfoUI: React.FC<Props> = () => {
  const { fetchUser, user } = useConstsStore((state) => state);
  React.useEffect(() => {
    fetchUser();
  }, []);
  const { signOut } = useSession();
  const [selected, setSelected] = React.useState(0);

  const { sendEmailVerification } = useSession();

  return (
    <VStack className="h-full w-full gap-3">
      <Button variant="outline" onPress={() => router.back()}>
        <ButtonText>{t("back")}</ButtonText>
      </Button>
      <Text className="text-center text-gray-500 dark:text-gray-400">Ya Iniciaste sesión</Text>
      <MyButtonGroup selected={selected} setSelected={setSelected} />
      <Card variant="outline" className="gap-5">
        {selected === 0 && <PerfilUI user={user} sendEmailVerification={sendEmailVerification} />}
        {selected === 1 && <SeguridadUI />}
      </Card>
      <Button onPress={() => signOut()}>
        <ButtonText>{t("logout.description")}</ButtonText>
      </Button>
    </VStack>
  );
};

interface ButtonGroupProps {
  selected: number;
  setSelected: (index: number) => void;
}

const MyButtonGroup: React.FC<ButtonGroupProps> = ({ selected, setSelected }) => {
  const handlePress = (index: number) => {
    setSelected(index);
  };

  return (
    <Card className="flex-row gap-2 p-3" size="sm">
      <Button onPress={() => handlePress(0)} variant={selected === 0 ? "solid" : "outline"}>
        <ButtonText>Perfil</ButtonText>
      </Button>
      <Button onPress={() => handlePress(1)} variant={selected === 1 ? "solid" : "outline"}>
        <ButtonText>Seguridad</ButtonText>
      </Button>
    </Card>
  );
};

interface PerfilProps {
  user: User | null | undefined;
  sendEmailVerification: () => void;
}
const PerfilUI: React.FC<PerfilProps> = ({ user, sendEmailVerification }) => {
  const { handleToast } = useMyToast();
  const [emailSend, setEmailSend] = React.useState(false);

  return (
    <>
      <Heading size="2xl">Información del Perfil</Heading>
      <VStack className="items-center gap-3">
        <Text> Actualizar información del perfil</Text>
        <Avatar></Avatar>
        <Button variant="outline" className="gap-2">
          <ButtonIcon as={Camera} />
          <ButtonText>Cambiar foto</ButtonText>
        </Button>
      </VStack>
      <Text>Nombre de usuario</Text>
      <Input>
        <InputField />
      </Input>
      <VStack className="items-start gap-2">
        <Text>Correo electrónico</Text>
        <HStack className="gap-3">
          <Input className="flex-1" isReadOnly>
            <InputField value={user?.email ?? ""} />
          </Input>
          {user?.emailVerified ? (
            <Badge action="success">
              <BadgeText>Verificado</BadgeText>
            </Badge>
          ) : (
            <Badge action="error">
              <BadgeText>No verificado</BadgeText>
            </Badge>
          )}
        </HStack>
        {!user?.emailVerified && (
          <Button
            variant="outline"
            className="gap-2"
            isDisabled={emailSend}
            onPress={async () => {
              await sendEmailVerification();
              handleToast(
                "Verificación enviada",
                "Revísala en tu bandeja de entrada, verifica y vuelve a iniciar sesión",
                "info",
              );
              setEmailSend(true);
            }}>
            <ButtonIcon as={MailCheck} />
            <ButtonText>Verificar</ButtonText>
          </Button>
        )}
      </VStack>
      <Button>
        <ButtonText>Guardar cambios</ButtonText>
      </Button>
    </>
  );
};

const SeguridadUI = () => {
  const { fetchUser, user } = useConstsStore((state) => state);
  const { handleToast } = useMyToast();
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { updatePassword, error } = useSession();

  React.useEffect(() => {
    console.log(error);
    switch (error?.code) {
      case "auth/wrong-password":
        handleToast("Contraseña actual", "Verifica que la contraseña actual sea correcta", "error");
        break;
      case "success-update-password": {
        updatesucesCleanInputs();
        handleToast("Perfecto", "tu contraseña se a actualizado", "success");
        break;
      }
      default:
        break;
    }
  }, [error]);

  function updatesucesCleanInputs() {
    setCurrentPassword("");
    setConfirmPassword("");
    setPassword("");
  }

  function handleUpdatePassword() {
    if (currentPassword === "") {
      handleToast("Contraseña actual", "Ingresa la contraseña actual", "error");
      return;
    }
    if (password !== confirmPassword) {
      handleToast("Contraseña no coincide", "Verifica que los campos coincidan", "error");
      return;
    }
    updatePassword(currentPassword, password);
  }
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
