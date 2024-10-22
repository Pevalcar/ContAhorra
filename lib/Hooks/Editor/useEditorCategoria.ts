import { useMyToast } from "@/lib/Hooks/useToast";
import { Categoria } from "@/lib/domain/entities";
import { useCategoriaStore } from "@/lib/store";
import React from "react";

export const useEditorCategoria = () => {
  const { updateCategoria, deleteCategoria, addCategoria, Error } = useCategoriaStore(
    (state) => state,
  );
  const [itemtoEdit, setItemtoEdit] = React.useState<Categoria | null>(null);
  const [itemtoDelete, setItemtoDelete] = React.useState<Categoria | null>(null);
  const [itemtoAdd, setITemtoAdd] = React.useState<Categoria | null>(null);
  const { handleToast } = useMyToast();

  React.useEffect(() => {
    if (Error) {
      handleToast("Error al Guardar", Error.message, "warning");
    }
  }, [Error]);

  const deleteItem = React.useCallback(async (item: Categoria | null) => {
    if (item) {
      setItemtoDelete(null);
      await deleteCategoria(item.id);
    }
  }, []);

  const setItemtoEditS = React.useCallback((item: Categoria | null) => {
    setItemtoDelete(null);
    setItemtoEdit(item);
  }, []);

  const setItemtoDeleteS = React.useCallback((item: Categoria | null) => {
    setItemtoEdit(null);
    setItemtoDelete(item);
  }, []);

  const editItem = React.useCallback(async (item: Categoria | null) => {
    if (item) {
      await updateCategoria(item);
      setItemtoEdit(null);
    }
  }, []);

  const addITem = React.useCallback(async (item: Categoria) => {
    if (item) {
      //TODO agregar verificación
      setITemtoAdd(null);
      await addCategoria(item);
    }
  }, []);

  const opeItemToAdd = React.useCallback(() => {
    setITemtoAdd(new Categoria({}));
  }, []);

  const closeItemToAdd = React.useCallback(() => {
    setITemtoAdd(null);
  }, []);

  return {
    itemtoEdit,
    itemtoDelete,
    itemtoAdd,
    deleteItem,
    editItem,
    setItemtoDeleteS,
    setItemtoEditS,
    opeItemToAdd,
    closeItemToAdd,
    addITem,
  };
};
