import {
  CategoriItem,
  DeleteModal,
  EditModal,
} from "@/components/Editor/ListEditorCategoria/CategoriaItemCard";
import { Text, VStack } from "@/components/ui";
import { useEditorCategoria } from "@/lib/Hooks/Editor/useEditorCategoria";
import React from "react";
import { FlatList } from "react-native";

export const ListEditorCategoria = () => {
  const {
    deleteItem,
    editItem,
    setItemtoDeleteS,
    setItemtoEditS,
    addITem,
    closeItemToAdd,
    opeItemToAdd,
    itemtoDelete,
    itemtoEdit,
    orderedCategorias,
    itemtoAdd,
  } = useEditorCategoria();
  return (
    <VStack className="my-2 px-4">
      <EditModal
        item={itemtoEdit}
        onClose={() => setItemtoEditS(null)}
        show={itemtoEdit !== null}
        onEditTap={editItem}
        edit={true}
      />
      <EditModal
        item={itemtoAdd}
        onClose={closeItemToAdd}
        show={itemtoAdd !== null}
        onEditTap={addITem}
        edit={false}
      />
      <DeleteModal
        item={itemtoDelete}
        onClose={() => setItemtoDeleteS(null)}
        show={itemtoDelete !== null}
        onDelete={deleteItem}
      />
      <FlatList
        data={orderedCategorias}
        renderItem={({ item }) => (
          <CategoriItem
            item={item}
            itemToEdit={() => setItemtoEditS(item)}
            itemToDelete={() => setItemtoDeleteS(item)}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </VStack>
  );
};
