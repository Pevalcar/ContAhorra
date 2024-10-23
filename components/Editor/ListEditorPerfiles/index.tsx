import { CreateProfileModal } from "@/components/CreateProfileModal";
import {
  Avatar,
  AvatarImage,
  Button,
  ButtonIcon,
  ButtonText,
  Card,
  HStack,
  Heading,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Text,
  VStack,
} from "@/components/ui";
import { Perfil } from "@/lib/domain/entities";
import { usePerfilesStore } from "@/lib/store";
import { EditIcon, Trash } from "lucide-react-native";
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
      <CreateProfileModal showModal={showModal} setShowModal={setShowModal} />
      <Button onPress={() => setShowModal(true)}>
        <ButtonText>{t("selecciona-un-perfil")}</ButtonText>
      </Button>
      {loagin ? (
        <HStack className="items-center justify-center gap-1">
          <Spinner size={"large"} />
          <Heading>{t("cargando-perfiles")}</Heading>
        </HStack>
      ) : null}
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

const PerfilCard: React.FC<PerfilCardProps> = React.memo(({ perfil }) => {
  const { deletePerfil } = usePerfilesStore((state) => state);
  const [deleteShowModal, setDeleteShowModal] = React.useState(false);
  const [editShowModal, setEditShowModal] = React.useState(false);
  const { t } = useTranslation();

  return (
    <Card style={{ backgroundColor: perfil.color }} variant="outline" className="mb-4">
      <Modal isOpen={deleteShowModal} onClose={() => setDeleteShowModal(false)} size="md">
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="md" className="text-typography-950">
              {t("confirmar-eliminacion-perfil-title")}
            </Heading>
          </ModalHeader>
          <ModalBody>
            <Text>{t("confirmar-eliminacion-perfil")}</Text>
          </ModalBody>
          <ModalFooter>
            <Button onPress={() => setDeleteShowModal(false)}>
              <ButtonText>{t("cancelar")}</ButtonText>
            </Button>
            <Button action="negative" onPress={() => deletePerfil(perfil.id)}>
              <ButtonText>{t("eliminar")}</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <CreateProfileModal
        showModal={editShowModal}
        setShowModal={setEditShowModal}
        ref={null}
        profileToEdit={perfil}
        ifEdit={true}
      />
      <HStack>
        <Avatar size="xl" className="mr-2">
          <AvatarImage source={{ uri: perfil.avatar_url }} alt="aslgo" />
        </Avatar>
        <VStack className="flex-1 items-center justify-center gap-1">
          <Heading>{perfil.name}</Heading>
        </VStack>
        <HStack className="items-center justify-center gap-1">
          {/* TODO hay que empesar a crear los mdoals para editar y eliminar con confirmacion */}
          <Button onPress={() => setDeleteShowModal(true)}>
            <ButtonIcon as={Trash} size="xl" />
          </Button>
          <Button onPress={() => setEditShowModal(true)}>
            <ButtonIcon as={EditIcon} size="xl" />
          </Button>
        </HStack>
      </HStack>
    </Card>
  );
});
