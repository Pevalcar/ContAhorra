import { MyIcon } from "@/components/Icons";
import {
  Badge,
  BadgeIcon,
  BadgeText,
  Button,
  ButtonIcon,
  Card,
  HStack,
  Heading,
  Icon,
  Text,
  VStack,
} from "@/components/ui";
import { TypeColor } from "@/lib/configs/Colors";
import { IconTypes } from "@/lib/configs/images";
import { Categoria } from "@/lib/domain/entities";
import { useCategoriaStore } from "@/lib/store";
import { CloudIcon, CloudOffIcon, PencilIcon, TrashIcon, Wallet } from "lucide-react-native";
import React from "react";
import { FlatList, View } from "react-native";

export const ListEditorCategoria = () => {
  const { categorias } = useCategoriaStore((state) => state);
  const orderedCategorias = categorias.sort((a, b) => a.type.localeCompare(b.type));

  return (
    <FlatList
      data={orderedCategorias}
      renderItem={({ item }) => <CategoriItem item={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

const CategoriItem = React.memo(({ item }: { item: Categoria }) => {
  return (
    <Card
      variant="outline"
      size="sm"
      className="mb-3 w-full max-w-md flex-row items-center justify-between gap-4 overflow-hidden"
      style={{ backgroundColor: item.color }}>
      <View className="h-12 w-12 flex-row items-center justify-center gap-2 rounded-full bg-background-800">
        <MyIcon name={item.icon} size={20} color={item.color} />
      </View>
      <VStack space="xs" className="flex-1 items-start justify-between">
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
          as={item.uptodataBase ? CloudIcon : CloudOffIcon}
          size="xs"
          stroke={item.uptodataBase ? "green" : "red"}
        />
        <HStack space="xs" className="flex-row items-center justify-between gap-2">
          <Button onPress={() => console.log("Editar")}>
            <ButtonIcon as={PencilIcon} size="xl" />
          </Button>
          <Button onPress={() => console.log("Eliminar")}>
            <ButtonIcon as={TrashIcon} size="xl" />
          </Button>
        </HStack>
      </VStack>
    </Card>
  );
});
