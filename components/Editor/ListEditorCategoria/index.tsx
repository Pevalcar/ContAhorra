import { TiposDeTransacciones } from "@/Types/types";
import { MyIcon } from "@/components/Icons";
import {
  Badge,
  BadgeIcon,
  BadgeText,
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  Card,
  CircleIcon,
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
  Pressable,
  Switch,
  Text,
  VStack,
} from "@/components/ui";
import { AppColorsCategorias, TypeColor } from "@/lib/configs/Colors";
import { IconTypes, Iconos } from "@/lib/configs/images";
import { Categoria } from "@/lib/domain/entities";
import { useCategoriaStore } from "@/lib/store";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { CloudIcon, CloudOffIcon, PencilIcon, TrashIcon, Wallet } from "lucide-react-native";
import React from "react";
import { FlatList, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export const ListEditorCategoria = () => {
  const { categorias } = useCategoriaStore((state) => state);
  const orderedCategorias = categorias.sort((a, b) => a.type.localeCompare(b.type));
  const [itemtoEdit, setItemtoEdit] = React.useState<Categoria | null>(null);
  const [itemtoDelete, setItemtoDelete] = React.useState<Categoria | null>(null);

  const deleteItem = (item: Categoria | null) => {
    setItemtoDelete(null);
  };

  return (
    <VStack className="my-2 px-4">
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
    </VStack>
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
          <Button action="negative" onPress={() => onDelete(item)}>
            <ButtonText>Eliminar</ButtonText>
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
  const [itemI, setItemI] = React.useState<Categoria>(new Categoria({}));
  const [showIconSelector, setShowIconSelector] = React.useState(false);

  React.useEffect(() => {
    setItemI(item ?? new Categoria({}));
  }, [item]);

  const onSave = async () => {
    if (item) {
      onClose();
    }
  };

  const setTypes = (index: number) => {
    setItemI(
      () =>
        new Categoria({
          ...itemI,
          type: index === 0 ? "Gasto" : index === 1 ? "Ingreso" : "Transferencia",
        }),
    );
  };

  const setName = (name: string) => {
    setItemI(() => new Categoria({ ...itemI, name }));
  };

  const setPrestamo = (prestamo: boolean) => {
    setItemI(() => new Categoria({ ...itemI, prestamo }));
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
              <InputField placeholder="Nombre" value={itemI.name} onChangeText={setName} />
            </Input>
            <Text>Tipo</Text>
            <SegmentedControl
              values={["Gasto", "Ingreso", "Transf."]}
              selectedIndex={itemI.type === "Gasto" ? 0 : itemI.type === "Ingreso" ? 1 : 2}
              onChange={(e) => setTypes(e.nativeEvent.selectedSegmentIndex)}
            />
            <Text>Icono</Text>

            <Pressable onPress={() => setShowIconSelector(true)}>
              <Box className="h-auto w-12 rounded-md border-2 border-green-400 bg-background-100 p-2">
                <MyIcon name={itemI.icon} color={itemI.color} />
              </Box>
            </Pressable>
            <Text>Color</Text>
            <HStack className="flex-row flex-wrap items-center gap-2 rounded-sm bg-background-100 p-2">
              {AppColorsCategorias.map((color, index) => (
                <Pressable
                  key={index}
                  onPress={() => setItemI(() => new Categoria({ ...itemI, color }))}>
                  <Box
                    className={itemI.color === color ? "border-4 border-green-600" : ""}
                    style={{
                      backgroundColor: color,
                      width: 30,
                      height: 30,
                      borderRadius: 100,
                    }}
                  />
                </Pressable>
              ))}
            </HStack>
            <HStack space="xs" className="flex-row items-center justify-between gap-2">
              <Badge action={itemI.prestamo ? "success" : "error"} className="gap-2">
                <BadgeText>Prestamos</BadgeText>
                <BadgeIcon as={Wallet} size="sm" />
              </Badge>
              <Switch value={itemI.prestamo} onValueChange={setPrestamo} />
            </HStack>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button onPress={onClose}>
            <ButtonText>Cancelar</ButtonText>
          </Button>
          <Button action="positive" onPress={() => onSave()}>
            <ButtonText>Guardar</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
      <IconModal item={item} onClose={() => setShowIconSelector(false)} show={showIconSelector} />
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

interface IconModalProps extends ModalProps {}

const IconModal: React.FC<ModalProps> = ({ item, onClose, show }) => {
  const onSave = async () => {
    if (item) {
      onClose();
    }
  };
  return (
    <Modal isOpen={show} onClose={onClose}>
      <ModalBackdrop />
      <ModalContent>
        <ModalBody>
          <Heading>Seleccione un icono</Heading>
          <View className="flex-row flex-wrap gap-2">
            {Iconos.map((icono, index) => (
              <Pressable
                key={index}
                onPress={() => onSave()}
                className={
                  item?.icon === icono
                    ? "rounded-md border-2 border-green-400 bg-background-200 p-1"
                    : ""
                }>
                <MyIcon size={30} name={icono} color={item?.icon === icono ? "green" : ""} />
              </Pressable>
            ))}
          </View>
        </ModalBody>
        <ModalFooter>
          <Button onPress={onClose}>
            <ButtonText>Cancelar</ButtonText>
          </Button>
          <Button action="positive" onPress={() => onSave()}>
            <ButtonText>Guardar</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
