import { Button, ButtonText } from "../ui/button";
import { Card } from "../ui/card";
import { Text } from "../ui/text";
import { VStack } from "../ui/vstack";
import { PerfilUI } from "./ui/Profile/ProfileUI";
import { SeguridadUI } from "./ui/Secure/SecureUI";
import { useSession } from "@/lib/sesionprovider/ctx";
import { router } from "expo-router";
import { t } from "i18next";
import React from "react";

interface Props {}
export const UserInfoUI: React.FC<Props> = () => {
  const { signOut } = useSession();
  const [selected, setSelected] = React.useState(0);

  return (
    <VStack className="h-full w-full gap-3">
      <Button variant="outline" onPress={() => router.back()}>
        <ButtonText>{t("back")}</ButtonText>
      </Button>
      <Text className="text-center text-gray-500 dark:text-gray-400">
        {t("ya-iniciaste-sesion")}
      </Text>
      <MyButtonGroup selected={selected} setSelected={setSelected} />
      <Card variant="outline" className="gap-5">
        {selected === 0 && <PerfilUI />}
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
        <ButtonText>{t("perfil")}</ButtonText>
      </Button>
      <Button onPress={() => handlePress(1)} variant={selected === 1 ? "solid" : "outline"}>
        <ButtonText>{t("seguridad")}</ButtonText>
      </Button>
    </Card>
  );
};
