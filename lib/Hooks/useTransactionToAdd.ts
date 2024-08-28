import { useCategoriaStore } from "../store/CategoriaStore";
import { useCuentasStore } from "../store/CuentasStore";
import { useTransactionToADDState } from "../store/TransactionToAddStore";
import useDebuger from "./useDebuger";
import type { Categoria, Cuenta, TiposDeTransacciones } from "@/Types/types";
import React from "react";

export const useTransactionToAdd = () => {
  const { setTitle, setMessage } = useDebuger((state) => state);
  const categorias = useCategoriaStore((state) => state.categorias);
  const cuentas = useCuentasStore((state) => state.cuentas);
  const {
    setCuentaId,
    setCategoriaId,
    setType,
    setDescription,
    categoriSelect,
    cuentaSelect,
    type,
    description,
  } = useTransactionToADDState((state) => state);

  const onTypeChange = (index: TiposDeTransacciones) => setType(index);

  const onCategoriaChange = (id: Categoria) => setCategoriaId(id);
  const onCuentaChange = (id: Cuenta) => setCuentaId(id);
  const onDescriptionChange = (description: string) =>
    setDescription(description);

  React.useEffect(() => {
    setTitle("Transaccion");
    setMessage(
      ` Typo: ${type} Cuenta: ${cuentaSelect?.name} Categori: ${categoriSelect?.name} Description: ${description}`,
    );
  }, [cuentaSelect, categoriSelect, type, description]);

  return {
    onCuentaChange,
    onCategoriaChange,
    onTypeChange,
    onDescriptionChange,
    description,
    categoriSelect,
    cuentaSelect,
    type,
    categoriasData: categorias, //TODO filtrar dependiendo de el typo
    cuentasData: cuentas,
  };
};
