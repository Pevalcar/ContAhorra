import { CategoriItem, EditModal } from "@/components/Editor/ListEditorCategoria/CategoriaItemCard";
import { Button, ButtonSpinner, ButtonText, VStack } from "@/components/ui";
import { useEditorCategoria } from "@/lib/Hooks/Editor/useEditorCategoria";
import { useCategoriaStore } from "@/lib/store";
import React from "react";
import { FlatList, View } from "react-native";

export const ListEditorCategoria = () => {
  const { categorias, loagin, initialFetch } = useCategoriaStore((state) => state);
  const { addITem, closeItemToAdd, opeItemToAdd, itemtoAdd } = useEditorCategoria();

  React.useEffect(() => {
    const fetchData = async () => {
      await initialFetch();
    };
    fetchData();
  }, []);
  return (
    <VStack className="my-2 flex-auto gap-2 px-4">
      {/* //TODO hay que implementar un loading mode */}
      {loagin ? (
        <View className="absolute bottom-0 left-0 right-0 top-0 z-20 flex h-full items-center justify-center bg-background-200/20">
          <ButtonSpinner size="large" />
        </View>
      ) : null}
      <Button onPress={opeItemToAdd}>
        <ButtonText>Agregar Categoria</ButtonText>
      </Button>
      <EditModal
        item={itemtoAdd}
        onClose={closeItemToAdd}
        show={itemtoAdd !== null}
        onEditTap={addITem}
        edit={false}
        loading={loagin}
      />
      <FlatList
        className="flex h-full"
        data={categorias}
        renderItem={({ item }) => <CategoriItem item={item} />}
        keyExtractor={(item) => item.id}
      />
    </VStack>
  );
};
