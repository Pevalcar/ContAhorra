import { TiposDeTransacciones } from "@/Types/types";
import { MyIcon } from "@/components/Icons";
import {
  Badge,
  BadgeIcon,
  BadgeText,
  Button,
  ButtonIcon,
  ButtonText,
  Card,
  HStack,
  Heading,
  Icon,
  Input,
  InputField,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  SegmentControl,
  Text,
  VStack,
} from "@/components/ui";
import { TypeColor } from "@/lib/configs/Colors";
import { IconTypes } from "@/lib/configs/images";
import { Categoria } from "@/lib/domain/entities";
import { useCategoriaStore } from "@/lib/store";
import Drawer from "expo-router/drawer";
import { CloudIcon, CloudOffIcon, PencilIcon, TrashIcon, Wallet } from "lucide-react-native";
import React from "react";
import { FlatList, View } from "react-native";

export const ListEditorCategoria = () => {
  const { categorias } = useCategoriaStore((state) => state);
  const orderedCategorias = categorias.sort((a, b) => a.type.localeCompare(b.type));
  const [itemtoEdit, setItemtoEdit] = React.useState<Categoria | null>(null);
  const [itemtoDelete, setItemtoDelete] = React.useState<Categoria | null>(null);

  const ref = React.useRef(null);

  const deleteItem = (item: Categoria | null) => {
    setItemtoDelete(null);
  };

  return (
    <>
      <EditModal item={itemtoEdit} onClose={() => setItemtoEdit(null)} show={itemtoEdit !== null} />
      <DeleteModal
        item={itemtoDelete}
        onClose={() => setItemtoDelete(null)}
        show={itemtoDelete !== null}
        onDelete={deleteItem}
      />
      <FlatList
        data={orderedCategorias}
        renderItem={({ item }) => (
          <CategoriItem item={item} itemToEdit={setItemtoEdit} itemToDelete={setItemtoDelete} />
        )}
        keyExtractor={(item) => item.id}
      />
    </>
  );
};

interface DeleteModalProps extends ModalProps {
  onDelete: (item: Categoria | null) => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ item, onClose, show, onDelete }) => {
  return (
    <Modal useRNModal={true} isOpen={show} onClose={onClose}>
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading>Eliminar Categoria</Heading>
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody>
          <VStack space="md">
            <Text>
              ¿Está seguro de que desea eliminar la categoria{" "}
              {
                <Text bold className="text-red-600">
                  {item?.name}
                </Text>
              }{" "}
              ?
            </Text>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button onPress={onClose}>
            <ButtonText>Cancelar</ButtonText>
          </Button>
          <Button className="bg-red-500" onPress={() => onDelete(item)}>
            <ButtonText className="text-white">Eliminar</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

interface ModalProps {
  item: Categoria | null;
  show: boolean;
  onClose: () => void;
}
const EditModal: React.FC<ModalProps> = ({ item, onClose, show }) => {
  const [name, setName] = React.useState(item?.name ?? "");
  const [type, setType] = React.useState<TiposDeTransacciones>(item?.type ?? "Gasto");
  const [icon, setIcon] = React.useState(item?.icon ?? "");
  const [color, setColor] = React.useState(item?.color ?? "");

  const onSave = async () => {
    if (item) {
      onClose();
    }
  };

  const setTypes = (index: number) => {
    setType(index === 0 ? "Gasto" : index === 1 ? "Ingreso" : "Transferencia");
  };

  return (
    <Modal isOpen={show} onClose={onClose}>
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading>Editar Categoria</Heading>
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody>
          <VStack space="md">
            <Text>Nombre</Text>
            <Input>
              <InputField placeholder="Nombre" value={name} onChangeText={setName} />
            </Input>
            <Text>Tipo</Text>
            <SegmentControl
              values={["Gasto", "Ingreso", "Transferencia"]}
              selectedIndex={item?.type === "Gasto" ? 0 : item?.type === "Ingreso" ? 1 : 2}
              onChange={(e) => setTypes(e)}
            />
            <Text>Icono</Text>

            <Text>Color</Text>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button onPress={onClose}>
            <ButtonText>Cancelar</ButtonText>
          </Button>
          <Button variant="outline" onPress={() => onSave()}>
            <ButtonText className="text-white">Guardar</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

interface Item {
  item: Categoria;
  itemToEdit: (item: Categoria) => void;
  itemToDelete: (item: Categoria) => void;
}

const CategoriItem = React.memo(({ item, itemToEdit, itemToDelete }: Item) => {
  return (
    <Card
      variant="outline"
      size="sm"
      className="mb-3 w-full max-w-md flex-row items-center justify-between gap-4 overflow-hidden border-2 border-background-800"
      style={{ backgroundColor: item.color }}>
      <View className="h-12 w-12 flex-row items-center justify-center gap-2 rounded-full bg-background-800">
        <MyIcon name={item.icon} size={20} color={item.color} />
      </View>
      <VStack space="xs" className="my-2 flex-1 items-start justify-between">
        <Heading size="xl" numberOfLines={1}>
          {item.name}
        </Heading>
        <HStack className="flex-row items-center justify-between gap-2">
          <Icon as={IconTypes[item.type]} size="xl" stroke={TypeColor[item.type]} />
          <Text
            style={{
              color: TypeColor[item.type],
            }}>
            {item.type}
          </Text>
        </HStack>

        {item.prestamo ? (
          <Badge className="gap-2">
            <BadgeText>Prestamos</BadgeText>
            <BadgeIcon as={Wallet} size="sm" />
          </Badge>
        ) : null}
      </VStack>
      <VStack className="items-end justify-end gap-2">
        <Icon
          className="absolute right-0 top-0"
          as={item.uptodataBase ? CloudIcon : CloudOffIcon}
          size="xs"
          stroke={item.uptodataBase ? "green" : "red"}
        />
        <HStack space="xs" className="flex-row items-center justify-between gap-2 py-6">
          <Button onPress={() => itemToDelete(item)}>
            <ButtonIcon as={TrashIcon} size="sm" stroke={item.color} />
          </Button>
          <Button onPress={() => itemToEdit(item)}>
            <ButtonIcon as={PencilIcon} size="sm" stroke={item.color} />
          </Button>
        </HStack>
      </VStack>
    </Card>
  );
});
