import { useCategoriaStore } from "../store/CategoriaStore";
import { useCuentasStore } from "../store/CuentasStore";
import { useTransactionToADDState } from "../store/TransactionToAddStore";
import useDebuger from "./useDebuger";
import type {
  Categoria,
  Cuenta,
  TiposDeTransacciones,
  Transaccion,
} from "@/Types/types";
import { useMediaQuery } from "@/components/ui/utils/use-media-query";
import * as Crypto from "expo-crypto";
import React from "react";

export const useTransactionToAdd = () => {
  const [isMobile] = useMediaQuery([
    {
      maxWidth: 480,
    },
    {
      minWidth: 481,
      maxWidth: 768,
    },
    {
      minWidth: 769,
      maxWidth: 1440,
    },
    {
      minWidth: 1441,
    },
  ]);

  const { setMessage } = useDebuger((state) => state);
  const categorias = useCategoriaStore((state) => state.categorias);
  const cuentas = useCuentasStore((state) => state.cuentas);
  const {
    setCuentaId,
    setCategoriaId,
    setType,
    setDescription,
    setAmount,
    setDate,
    reset,
    date: currentDate,
    categoriSelect,
    cuentaSelect,
    type,
    description,
    amount,
  } = useTransactionToADDState((state) => state);

  React.useEffect(() => {
    reset();
    return () => {
      setMessage("Transaccion", "");
      reset();
    };
  }, []);

  const onTypeChange = (index: TiposDeTransacciones) => setType(index);

  const onCategoriaChange = (id: Categoria) => setCategoriaId(id);
  const onCuentaChange = (id: Cuenta) => setCuentaId(id);
  const onDescriptionChange = (description: string) =>
    setDescription(description); //TODO validar la descripcion
  const onDateChange = (date: Date) => setDate(date);
  const onAmountChange = (amount: number) => setAmount(amount);

  function saveTransaction() {
    const transaccions: Transaccion = {
      account: cuentaSelect?.id,
      category: categoriSelect?.id,
      type: "Gasto",
      description: description,
      balance: amount,
      date: currentDate.getTime(),
      id: Crypto.randomUUID(),
      title: description,
    };
    setMessage("Transaccion", JSON.stringify(transaccions));
  }

  return {
    onCuentaChange,
    onCategoriaChange,
    onTypeChange,
    onDescriptionChange,
    setAmount: onAmountChange,
    onDateChange,
    saveTransaction,
    currentDate,
    amount,
    description,
    categoriSelect,
    cuentaSelect,
    type,
    categoriasData: categorias, //TODO filtrar dependiendo de el typo
    cuentasData: cuentas,
    isMobile,
  };
};
