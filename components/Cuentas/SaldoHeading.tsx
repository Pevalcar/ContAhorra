import { formatValue } from "@/lib/Helpers/formaters";
import { Heading } from "../ui/heading";
import { VStack } from "../ui/vstack";
import { TextCurrency } from "../TextCurrency";

interface Props {
  value: number;
}

export const SaldoHeading = ({ value }: Props) => {
  return (
    <VStack
      space="md"
      className="w-auto items-center rounded-full border border-outline-300 bg-background-0 py-10"
    >
      <TextCurrency value={value} size="3xl" />
      <Heading>Saldo</Heading>
    </VStack>
  );
};
