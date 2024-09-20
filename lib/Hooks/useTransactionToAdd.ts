import { INITIALCATEGORY, INITIALCUENTA } from "../config";
import { useCategoriaStore } from "../store/CategoriaStore";
import { useCuentasStore } from "../store/CuentasStore";
import { useTransaccionesStore } from "../store/TransaccionesStore";
import { useTransactionToADDState } from "../store/TransactionToAddStore";
import { initialState } from "../useStorageState";
import useDebuger from "./useDebuger";
import { useMyToast } from "./useToast";
import type { Categoria, Cuenta, TiposDeTransacciones, Transaccion } from "@/Types/types";
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
  const agregarTransacciones = useTransaccionesStore((state) => state.addTransaccion);
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
  const { handleToast } = useMyToast();

  React.useEffect(() => {
    const loadInitialData = async () => {
      const initialCategory = await initialState(INITIALCATEGORY, null);
      const initialCuenta = await initialState(INITIALCUENTA, null);
      if (initialCategory) setCategoriaId(initialCategory);
      if (initialCuenta) setCuentaId(initialCuenta);
    };
    loadInitialData();
  }, [setCategoriaId, setCuentaId]);

  React.useEffect(() => {
    reset();
    return () => {
      setMessage("Transaccion", "");
      reset();
    };
  }, [reset, setMessage]);

  const onTypeChange = (index: TiposDeTransacciones) => setType(index);

  const onCategoriaChange = (id: Categoria) => setCategoriaId(id);
  const onCuentaChange = (id: Cuenta) => setCuentaId(id);
  const onDescriptionChange = (description: string) => setDescription(description); //TODO validar la descripcion
  const onDateChange = (date: Date) => setDate(date);
  const onAmountChange = React.useCallback((amount: number) => setAmount(amount), [setAmount]);

  async function saveTransaction() {
    try {
      if (!amount) {
        handleToast("Error de transacción", "Inserte una cantidad válida");
        throw new Error("Error de transacción");
      }
      if (!description) {
        handleToast("Error de transacción", "Inserte una descripción válida");
        throw new Error("Error de transacción");
      }

      const transaccions: Transaccion = {
        account: cuentaSelect?.id,
        category: categoriSelect?.id,
        type: type,
        description: description,
        balance: amount,
        date: currentDate.getTime(),
        id: Crypto.randomUUID(),
        title: description,
      };

      setMessage("Transacción", JSON.stringify(transaccions));
      await agregarTransacciones(transaccions);
      handleToast("Transacción", "Transacción guardada");
    } catch (error) {
      console.error("Error al guardar la transacción:", error);
      throw error;
    }
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
