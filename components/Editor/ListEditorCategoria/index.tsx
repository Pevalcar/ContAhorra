import { MyIcon } from "@/components/Icons";
import { Badge, BadgeText, Card, Heading, Text, VStack } from "@/components/ui";
import { Categoria } from "@/lib/domain/entities";
import { useCategoriaStore } from "@/lib/store";
import { FlatList, View } from "react-native";

export const ListEditorCategoria = () => {
  const { categorias, loagin } = useCategoriaStore((state) => state);
  return (
    <FlatList
      data={categorias}
      renderItem={({ item }) => <CategoriItem item={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

const CategoriItem = ({ item }: { item: Categoria }) => {
  return (
    <Card className="mb-3 w-full max-w-md overflow-hidden" style={{ backgroundColor: item.color }}>
      <VStack space="xs" className="items-start justify-between">
        <Heading size="sm" className="pb-2" numberOfLines={1}>
          {item.name}
        </Heading>
        <MyIcon name={item.icon} size={20} color="black" />
        <Text>{item.type}</Text>
        {item.prestamo ? (
          <Badge>
            <BadgeText>Prestado</BadgeText>
          </Badge>
        ) : null}
        <Text>{item.userOwnerID}</Text>
        <Text>{item.uptodataBase ? "true" : "false"}</Text>
      </VStack>
    </Card>
  );
};
