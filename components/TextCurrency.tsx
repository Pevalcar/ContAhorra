import { Heading } from "./ui/heading";
import { Text } from "@/components/ui/";
import { formatValue } from "@/lib/Helpers/formaters";

interface Props {
  value: number;
  size: "sm" | "md" | "lg" | "xl" | "3xl";
  neutral?: boolean;
  sign?: boolean;
  negative?: boolean;
}

export const TextCurrency = ({
  value,
  size = "md",
  neutral = false,
  sign = false,
  negative = false,
}: Props) => {
  const textColor = neutral
    ? "text-typography-900"
    : negative
      ? "text-error-600"
      : "text-green-500";

  return (
    <Text size={size} className="font-semibold text-error-500">
      {sign && (negative ? "-" : "+")}
      {formatValue(value)}
    </Text>
  );
};
