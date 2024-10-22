import { CreateProfileModal } from "@/components/CreateProfileModal";
import {
  Button,
  ButtonText,
  Card,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
  View,
} from "@/components/ui";
import { Perfil } from "@/lib/domain/entities";
import { usePerfilesStore } from "@/lib/store";
import React from "react";
import { useTranslation } from "react-i18next";
import { FlatList } from "react-native";

export const ListEditorPerfiles = () => {
  const { t } = useTranslation();
  const { perfiles, loagin, fetchPerfiles } = usePerfilesStore((state) => state);
  const [showModal, setShowModal] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      await fetchPerfiles();
    };
    fetchData();
  }, []);

  return (
    <VStack space="md" className="my-2 flex-auto gap-2 px-4">
      <CreateProfileModal showModal={showModal} setShowModal={setShowModal} ref={null} />
      <Button onPress={() => setShowModal(true)}>
        <ButtonText>agregar perfil</ButtonText>
      </Button>
      {loagin ? <Text>Cargando perfiles</Text> : null}
      <FlatList
        className="flex h-full"
        data={perfiles}
        renderItem={({ item }) => <PerfilCard perfil={item} />}
        keyExtractor={(item) => item.id}
      />
    </VStack>
  );
};

interface PerfilCardProps {
  perfil: Perfil;
}

const PerfilCard: React.FC<PerfilCardProps> = ({ perfil }) => {
  return (
    <Card style={{ backgroundColor: perfil.color }} className="mb-4">
      <HStack>
        <Heading>{perfil.name}</Heading>
        <Image source={{ uri: perfil.avatar_url }} alt="aslgo" />
        <Text>{JSON.stringify(perfil)}</Text>
      </HStack>
    </Card>
  );
};
