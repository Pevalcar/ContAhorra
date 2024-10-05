import { TextCurrency } from "../TextCurrency";
import { Heading } from "../ui/heading";
import { VStack } from "../ui/vstack";
import { useTransaccionesStore } from "@/lib/store/TransaccionesStore";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {}
export const SaldoHeading: React.FC<Props> = () => {
  // const transacciones = useTransaccionesStore((state) => state.transacciones);
  const { saldo, getTotalTransaction, transaccionesByMonth } = useTransaccionesStore(
    (state) => state,
  );
  const { t } = useTranslation();
  //TODO reformatear
  React.useEffect(() => {
    const fetchAndSetUser = async () => {
      await getTotalTransaction();
    };
    fetchAndSetUser();
  }, [transaccionesByMonth]);

  return (
    <VStack
      space="md"
      className="w-auto items-center rounded-full border border-outline-300 bg-background-0 py-5">
      <TextCurrency value={saldo.total} negative={saldo.total < 0} size="3xl" />
      <TextCurrency value={saldo.totalIncome} size="sm" />
      <TextCurrency value={saldo.totalExpenses} negative={saldo.totalExpenses > 0} size="sm" />
      <TextCurrency value={saldo.totalPrestamos} size="sm" />
      <TextCurrency
        value={saldo.totalTransferences}
        negative={saldo.totalTransferences < 0}
        size="sm"
      />
      <Heading>{t("saldo")}</Heading>
    </VStack>
  );
};
