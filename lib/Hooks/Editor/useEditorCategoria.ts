import { useMyToast } from "@/lib/Hooks/useToast";
import { Categoria } from "@/lib/domain/entities";
import { useCategoriaStore } from "@/lib/store";
import React from "react";

export const useEditorCategoria = () => {
  const {
    categorias,
    updateCategoria,
    deleteCategoria,
    addCategoria,
    sortCateforys,
    Error,
    orderCategoris,
  } = useCategoriaStore((state) => state);
  const [itemtoEdit, setItemtoEdit] = React.useState<Categoria | null>(null);
  const [itemtoDelete, setItemtoDelete] = React.useState<Categoria | null>(null);
  const [itemtoAdd, setITemtoAdd] = React.useState<Categoria | null>(null);
  const { handleToast } = useMyToast();

  React.useEffect(() => {
    if (Error) {
      handleToast("Error al Guardar", Error.message, "warning");
    }
  }, [Error]);

  React.useEffect(() => {
    console.log("categorias sortend");

    sortCateforys();
  }, [categorias]);

  const deleteItem = React.useCallback(async (item: Categoria | null) => {
    if (item) {
      await deleteCategoria(item.id);
      setItemtoDelete(null);
    }
  }, []);

  const setItemtoEditS = React.useCallback((item: Categoria | null) => {
    setItemtoEdit(item);
    setItemtoDelete(null);
  }, []);

  const setItemtoDeleteS = React.useCallback((item: Categoria | null) => {
    setItemtoDelete(item);
    setItemtoEdit(null);
  }, []);

  const editItem = React.useCallback(async (item: Categoria | null) => {
    if (item) {
      await updateCategoria(item);
      setItemtoEdit(null);
    }
  }, []);

  const addITem = React.useCallback(async (item: Categoria) => {
    if (item) {
      await addCategoria(item);
      setITemtoAdd(null);
    }
  }, []);

  const opeItemToAdd = React.useCallback(() => {
    setITemtoAdd(new Categoria({}));
  }, []);

  const closeItemToAdd = React.useCallback(() => {
    setITemtoAdd(null);
  }, []);

  return {
    orderedCategorias: orderCategoris,
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
