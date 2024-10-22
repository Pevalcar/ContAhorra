import { CreateProfileModal } from "@/components/CreateProfileModal";
import {
  Button,
  ButtonText,
  Card,
  HStack,
  Heading,
  Image,
  Input,
  InputField,
  Text,
  View,
} from "@/components/ui";
import { Perfil } from "@/lib/domain/entities";
import { usePerfilesStore } from "@/lib/store";
import { PervilValidationSquema } from "@/lib/validations/perfilValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FlatList, TextInput } from "react-native";

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
    <View>
      <CreateProfileModal showModal={showModal} setShowModal={setShowModal} ref={null} />
      <Button onPress={() => setShowModal(true)}>
        <ButtonText>agregar perfil</ButtonText>
      </Button>
      {loagin ? <Text>Cargando perfiles</Text> : null}
      <FlatList
        data={perfiles}
        renderItem={({ item }) => <PerfilCard perfil={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

interface PerfilCardProps {
  perfil: Perfil;
}

const PerfilCard: React.FC<PerfilCardProps> = ({ perfil }) => {
  return (
    <Card>
      <HStack>
        <Heading>{perfil.name}</Heading>
        <Image source={{ uri: perfil.avatar_url }} alt="aslgo" />
      </HStack>
    </Card>
  );
};
