import { TextCurrency } from "../TextCurrency";
import { Card, HStack, Heading } from "../ui";
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
    <HStack space="md" className="w-auto items-center justify-between">
      <Card className="w-auto flex-1">
        <TextCurrency value={saldo.total} negative={saldo.total < 0} size="xl" />
        <Heading>{t("saldo")}</Heading>
      </Card>
      <Card className="w-auto flex-1">
        <TextCurrency value={saldo.totalExpenses} size="xl" negative />
        <Heading>{t("gastos")}</Heading>
      </Card>
    </HStack>
  );
};
