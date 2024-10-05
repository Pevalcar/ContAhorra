import { Transaccion } from "../domain/entities";
import { useTransaccionesStore } from "../store/TransaccionesStore";
import { useTransactionToADDState } from "../store/TransactionToAddStore";
import { useMyToast } from "./useToast";
import { useDebuger } from "@/lib/Hooks/useDebuger";
import * as Crypto from "expo-crypto";
import React from "react";

export const useTransactionToAdd = () => {
  const { setMessage } = useDebuger((state) => state);
  const agregarTransacciones = useTransaccionesStore((state) => state.addTransaccion);
  const {
    setDate,
    reset,
    date: currentDate,
    type,
    description,
  } = useTransactionToADDState((state) => state);
  const { handleToast } = useMyToast();

  React.useEffect(() => {
    reset();
    return () => {
      setMessage("Transaccion", "");
      reset();
    };
  }, [reset, setMessage]);
  const onDateChange = (date: Date) => setDate(date);

  async function saveTransaction() {
    try {
      // if (!amount) {
      //   handleToast("Error de transacción", "Inserte una cantidad válida");
      //   throw new Error("Error de transacción");
      // }
      if (!description) {
        handleToast("Error de transacción", "Inserte una descripción válida");
        throw new Error("Error de transacción");
      }
      const date = new Date();
      const dateTimestamp = Math.floor(date.getTime() / 1000);
      const transaccions: Transaccion = new Transaccion({
        // accountID: cuentaSelect?.id ,
        // categoryID: categoriSelect?.id ,
        // type: type,
        description: description,
        date: dateTimestamp,
        id: Crypto.randomUUID(),
        title: description,
        prestadoaID: "",
        prestadoaName: "", //TODO por poner luego
      });
      setMessage("Transacción", JSON.stringify(transaccions));
      await agregarTransacciones(transaccions);
      console.log(transaccions);
      handleToast("Transacción", "Transacción guardada");
    } catch (error) {
      console.error("Error al guardar la transacción:", error);
      throw error;
    }
  }

  return {
    onDateChange,
    saveTransaction,
    currentDate,
    description,
    type,
  };
};
