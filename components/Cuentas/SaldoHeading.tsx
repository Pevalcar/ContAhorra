import { TextCurrency } from "../TextCurrency";
import { Heading } from "../ui/heading";
import { VStack } from "../ui/vstack";
import { useTransaccionesStore } from "@/lib/store/TransaccionesStore";
import { useTranslation } from "react-i18next";

interface Props {}

export const SaldoHeading: React.FC<Props> = () => {
  const transacciones = useTransaccionesStore((state) => state.transacciones);
  const saldo = transacciones.reduce((acum, transaccion) => {
    if (transaccion.type === "Transferencia" || transaccion.type === "Gasto") {
      return acum - transaccion.balance;
    }
    return acum + transaccion.balance;
  }, 0);
  const { t } = useTranslation();
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
