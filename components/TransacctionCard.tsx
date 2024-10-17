import { MyIcon } from "./Icons";
import {
  Avatar,
  AvatarFallbackText,
  Badge,
  BadgeText,
  Button,
  ButtonText,
  Card,
  HStack,
  Heading,
  Icon,
  Image,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Switch,
  Text,
  VStack,
} from "@/components/ui/";
import { formatValue } from "@/lib/Helpers/formaters";
import { Categoria, Transaccion } from "@/lib/domain/entities";
import {
  useCategoriaStore,
  useCuentasStore,
  usePerfilesStore,
  useTransaccionesStore,
} from "@/lib/store";
import { t } from "i18next";
import { ArrowUp } from "lucide-react-native";
import React from "react";
import { Pressable } from "react-native";

interface Props {
  item: Transaccion;
}

export const TransacctionCard = React.memo(function ({ item }: Props) {
  const { deleteTransaccion, loading } = useTransaccionesStore((state) => state);
  const [setShowDeleteModal, setShowDeleteModalsetShowDeleteModal] = React.useState(false);
  const [showIfoModal, setShowIfoModal] = React.useState(false);

  const onDelete = () => {
    if (loading) return;
    setShowDeleteModalsetShowDeleteModal(true);
  };

  return (
    <Card size="sm" variant="elevated" className="mb-1 border">
      <DeleteModal
        item={item}
        setShowDeleteModal={setShowDeleteModal}
        setShowIfoModal={setShowIfoModal}
        setShowDeleteModalsetShowDeleteModal={setShowDeleteModalsetShowDeleteModal}
        deleteTransaccion={deleteTransaccion}
      />
      <InfoModal
        item={item}
        showIfoModal={showIfoModal}
        setShowIfoModal={setShowIfoModal}
        setShowDeleteModalsetShowDeleteModal={setShowDeleteModalsetShowDeleteModal}
      />
      <BodyCard item={item} onDelete={onDelete} onPress={() => setShowIfoModal(true)} />
    </Card>
  );
});
interface BodyCardProps {
  item: Transaccion;
  onDelete: () => void;
  onPress: () => void;
}

const BodyCard: React.FC<BodyCardProps> = ({ item, onDelete, onPress }) => {
  const { getProfileByID } = usePerfilesStore((state) => state);
  const { getCategoryByID } = useCategoriaStore((state) => state);
  const perfil = getProfileByID(item.prestadoaID);
  const categoria = getCategoryByID(item.categoryID);
  const bgColor = () => {
    switch (item.type) {
      case "Ingreso":
        return "bg-green-400 text-green-800";
      case "Gasto":
        return "bg-red-600 text-red-800";
      case "Transferencia":
        return "bg-yellow-400 text-yellow-800";
      default:
        return "bg-gray-400 text-gray-800";
    }
  };
  return (
    <Pressable className="mb-4 flex-row items-center justify-between" onPress={onPress}>
      <Avatar size="sm" className={bgColor()}>
        <AvatarFallbackText className="text-white">{item.type}</AvatarFallbackText>
      </Avatar>
      <VStack className="ml-4 flex-1 items-start gap-1">
        <Heading size="sm" numberOfLines={1}>
          {item.description}
        </Heading>
        <Text>{new Date(item.date * 1000).toLocaleDateString()}</Text>
        <BadgeCategoria categoria={categoria} />
        {perfil && (
          <HStack className="items-center gap-2">
            <Text>{t("prestado-a") + perfil.name}</Text>
            <Image
              source={{ uri: perfil.avatar_url }}
              className="h-10 w-10 rounded-full"
              alt={perfil.avatar_url + "iamge"}
            />
          </HStack>
        )}
      </VStack>
      <Text
        className="text-sm font-semibold"
        style={{ color: item.type === "Ingreso" ? "green" : "red" }}>
        {item.type === "Ingreso" ? "+ " : "- "}
        {formatValue(item.balance)}
      </Text>
    </Pressable>
  );
};

const DeleteModal = ({
  item,
  setShowDeleteModal: ShowDeleteModal,
  setShowDeleteModalsetShowDeleteModal,
  deleteTransaccion,
  setShowIfoModal,
}: {
  item: Transaccion;
  setShowDeleteModal: boolean;
  setShowIfoModal: (value: boolean) => void;
  setShowDeleteModalsetShowDeleteModal: (value: boolean) => void;
  deleteTransaccion: (id: string) => void;
}) => {
  return (
    <Modal
      isOpen={ShowDeleteModal}
      onClose={() => {
        setShowDeleteModalsetShowDeleteModal(false);
      }}
      size="md">
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="md" className="text-typography-950">
            {t("eliminar-transaccion")}
          </Heading>
        </ModalHeader>
        <ModalBody>
          <Text>{t("confirmar-eliminar")}</Text>
        </ModalBody>
        <ModalFooter>
          <Button onPress={() => setShowDeleteModalsetShowDeleteModal(false)}>
            <ButtonText>{t("cancelar")}</ButtonText>
          </Button>
          <Button
            variant="outline"
            onPress={() => {
              setShowIfoModal(false);
              setShowDeleteModalsetShowDeleteModal(false);
              deleteTransaccion(item.id);
            }}>
            <ButtonText>{t("eliminar")}</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const InfoModal = ({
  item,
  showIfoModal,
  setShowIfoModal,
  setShowDeleteModalsetShowDeleteModal,
}: {
  item: Transaccion;
  showIfoModal: boolean;
  setShowIfoModal: (value: boolean) => void;
  setShowDeleteModalsetShowDeleteModal: (value: boolean) => void;
}) => {
  const { getCategoryByID } = useCategoriaStore((state) => state);
  const { getCuentaByID } = useCuentasStore((state) => state);
  const { getProfileByID } = usePerfilesStore((state) => state);
  const { updatePago, loading } = useTransaccionesStore((state) => state);
  return (
    <Modal isOpen={showIfoModal} onClose={() => setShowIfoModal(false)}>
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="md" className="text-typography-950">
            {t("info")}
          </Heading>
        </ModalHeader>
        <ModalBody>
          <VStack className="gap-5">
            <InfoSection title={t("info-modal")}>
              <Icon as={ArrowUp} stroke="green" />
              <HStack>
                <Text>
                  {item.type === "Ingreso"
                    ? t("ingreso")
                    : item.type === "Gasto"
                      ? t("gasto")
                      : t("transferencia")}
                </Text>
              </HStack>
            </InfoSection>
            <InfoSection title={t("descripcion")}>
              <Text>{item.description}</Text>
            </InfoSection>
            <InfoSection title={t("monto")}>
              <Text
                className="text-sm font-semibold"
                style={{ color: item.type === "Ingreso" ? "green" : "red" }}>
                {item.type === "Ingreso" ? "+ " : "- "}
                {formatValue(item.balance)}
              </Text>
            </InfoSection>
            <InfoSection title={t("fecha")}>
              <Text>{new Date(item.date * 1000).toLocaleDateString()}</Text>
            </InfoSection>
            <InfoSection title={t("info-modal-categoria")}>
              <Text>{getCategoryByID(item.categoryID)?.name}</Text>
            </InfoSection>
            <InfoSection title={t("info-modal-cuenta")}>
              <Text>{getCuentaByID(item.accountID)?.name}</Text>
            </InfoSection>
            {item.prestadoaName && (
              <VStack>
                <InfoSection title={t("info-modal-prestado")}>
                  <Text>{getProfileByID(item.prestadoaID)?.name}</Text>
                </InfoSection>
                <InfoSection title={t("info-modal-cuenta-a")}>
                  <Switch
                    isDisabled={loading}
                    defaultValue={item.pago}
                    onValueChange={() => updatePago(item.id)}
                  />
                </InfoSection>
              </VStack>
            )}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button onPress={() => setShowIfoModal(false)}>
            <ButtonText>{t("cancelar")}</ButtonText>
          </Button>
          <Button
            className="bg-red-500"
            onPress={() => {
              setShowDeleteModalsetShowDeleteModal(true);
            }}>
            <ButtonText className="text-white">{t("eliminar")}</ButtonText>
          </Button>
          <Button variant="outline" onPress={() => {}}>
            <ButtonText>{t("aceptar")}</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const InfoSection = ({ children, title }: { children: React.ReactNode; title: string }) => {
  return (
    <HStack className="gap-5">
      <Text>{title}</Text>
      <HStack>{children}</HStack>
    </HStack>
  );
};

const BadgeCategoria = ({ categoria }: { categoria: Categoria | null }) => {
  return (
    <Badge
      className="gap-1 rounded-xl"
      size="md"
      variant="outline"
      style={{ backgroundColor: categoria?.color }}>
      <MyIcon name={categoria?.icon ?? "Shoping"} size={18} color={"black"} />
      <BadgeText className="text-black">{categoria?.name}</BadgeText>
    </Badge>
  );
};
