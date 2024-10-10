import { Button, ButtonText, Image, Text, VStack } from "@/components/ui";
import { LOCAL_DB_PROFILES_NAME } from "@/lib/configs/config";
import { getAllGroup, getAllProfileByUserOwnerID } from "@/lib/core/di/Container";
import { Group, Perfil } from "@/lib/domain/entities";
import { usePerfilesStore } from "@/lib/store";
import { useSQLiteContext } from "expo-sqlite";
import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

export default function Reportes() {
  const { t } = useTranslation();
  const [grupos, setGrupos] = React.useState<Group[] | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      await usePerfilesStore.getState().fetchPerfiles();
    };
    fetchData();
  }, []);

  const getAllGroups = async () => {
    const result = await getAllGroup.execute();
    setGrupos(result);
  };

  return (
    <View>
      <Text>{t("reports")}</Text>
      <Button onPress={getAllGroups}>
        <ButtonText>optener grupos</ButtonText>
      </Button>
      {grupos &&
        grupos.map((grupo) => {
          return (
            <VStack>
              <Text key={grupo.id}>{grupo?.name ?? "no name"}</Text>
              <Perfiles perfiles={grupo?.usersIdInGroup ?? []} />
            </VStack>
          );
        })}
    </View>
  );
}

function Perfiles({ perfiles }: { perfiles: string[] }) {
  const [perfilesData, setPerfilesData] = React.useState<Perfil[]>([]);
  const getProfileByID = usePerfilesStore((state) => state.getProfileByID);

  React.useEffect(() => {
    const fetchData = async () => {
      const perfiless = perfiles.map((p) => getProfileByID(p));
      setPerfilesData(perfiless);
    };
    fetchData();
  }, []);

  return (
    <VStack>
      <Text>Perfiles</Text>
      {perfilesData.map((perfil) => (
        <VStack key={perfil.id}>
          <Text>{perfil.name}</Text>
          <Image source={{ uri: perfil.avatar_url }} alt="aslgo" />
        </VStack>
      ))}
    </VStack>
  );
}
