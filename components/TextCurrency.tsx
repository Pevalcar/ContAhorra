import { formatValue } from "@/lib/Helpers/formaters";
import { Text } from "./ui/text";
import { Heading } from "./ui/heading";

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
    <Heading size={size} className={`text-${size} font-bold ${textColor} `}>
      {sign && (negative ? "-" : "+")}
      {formatValue(value)}
    </Heading>
  );
};
