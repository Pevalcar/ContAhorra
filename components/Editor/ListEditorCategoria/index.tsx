import { CategoriItem, EditModal } from "@/components/Editor/ListEditorCategoria/CategoriaItemCard";
import { Button, ButtonText, HStack, Heading, Spinner, VStack } from "@/components/ui";
import { useEditorCategoria } from "@/lib/Hooks/Editor/useEditorCategoria";
import { useCategoriaStore } from "@/lib/store";
import React from "react";
import { useTranslation } from "react-i18next";
import { FlatList } from "react-native";

export const ListEditorCategoria = () => {
  const { categorias, loagin, initialFetch } = useCategoriaStore((state) => state);
  const { t } = useTranslation();
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
      {loagin ? (
        <HStack className="items-center justify-center gap-1">
          <Spinner size={"large"} />
          <Heading>{t("cargando-perfiles")}</Heading>
        </HStack>
      ) : null}
      <FlatList
        className="flex h-full"
        data={categorias}
        renderItem={({ item }) => <CategoriItem item={item} />}
        keyExtractor={(item) => item.id}
      />
    </VStack>
  );
};
