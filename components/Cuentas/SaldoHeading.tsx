import { TextCurrency } from "../TextCurrency";
import { Heading } from "../ui/heading";
import { VStack } from "../ui/vstack";
import { useTransaccionesStore } from "@/lib/store/TransaccionesStore";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {}

export const SaldoHeading: React.FC<Props> = () => {
  const transacciones = useTransaccionesStore((state) => state.transacciones);
  const { t } = useTranslation();
  const [saldo, setSaldo] = React.useState(0);

  React.useEffect(() => {
    let saldo = 0;
    transacciones.forEach((transaccion) => {
      if (
        transaccion.type === "Transferencia" ||
        transaccion.type === "Préstamo" ||
        transaccion.type === "Gasto"
      ) {
        saldo -= transaccion.balance;
      } else {
        saldo += transaccion.balance;
      }
    });
    setSaldo(saldo);
  }, [transacciones]);
  return (
    <VStack
      space="md"
      className="w-auto items-center rounded-full border border-outline-300 bg-background-0 py-5"
    >
      <TextCurrency value={saldo} negative={saldo < 0} size="3xl" />

      <Heading>{t("saldo")}</Heading>
    </VStack>
  );
};
