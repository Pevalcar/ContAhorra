import { TextCurrency } from "../TextCurrency";
import { Heading } from "../ui/heading";
import { VStack } from "../ui/vstack";
import { useTranslation } from "react-i18next";

interface Props {
  value: number;
}

export const SaldoHeading = ({ value }: Props) => {
  const { t } = useTranslation();
  return (
    <VStack
      space="md"
      className="w-auto items-center rounded-full border border-outline-300 bg-background-0 py-10"
    >
      <TextCurrency value={value} size="3xl" />
      <Heading>{t("saldo")}</Heading>
    </VStack>
  );
};
