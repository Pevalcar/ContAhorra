import {
  HStack,
  Heading,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "../ui";
import { TiposDeTransacciones } from "@/Types/types";
import { useTransaccionesStore } from "@/lib/store";
import { FilterIcon } from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {}

export const Filtros: React.FC<Props> = () => {
  const { setFilter, loading, filter } = useTransaccionesStore((state) => state);
  const { t } = useTranslation();
  function onChange(index: TiposDeTransacciones | "Todo") {
    if (index === "Todo") return setFilter(null);
    setFilter(index);
  }
  return (
    <HStack space="md" className="w-auto items-center justify-between">
      <Heading size="lg">{t("home.history")}</Heading>
      <Select
        onValueChange={(index) => onChange(index as TiposDeTransacciones)}
        defaultValue={filter ?? "Todo"}
        isDisabled={loading}
        className="flex-row flex-wrap items-end justify-end gap-2">
        <SelectTrigger>
          <SelectIcon as={FilterIcon} className="mr-3" />
          <SelectInput />
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop />
          <SelectContent>
            <SelectDragIndicatorWrapper>
              <SelectDragIndicator />
            </SelectDragIndicatorWrapper>
            <SelectItem label={t("FILTROTODO")} value={"Todo"} />
            <SelectItem label="Gasto" value="Gasto" />
            <SelectItem label="Ingreso" value="Ingreso" />
            <SelectItem label="Transferencia" value="Transferencia" />
          </SelectContent>
        </SelectPortal>
      </Select>
    </HStack>
  );
};
