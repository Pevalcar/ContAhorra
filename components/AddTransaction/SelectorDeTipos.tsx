import { SegmentControl } from "../ui";
import type { TiposDeTransacciones } from "@/Types/types";
import { useTransactionToADDState } from "@/lib/store";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {}

export const SelectorDeTipos: React.FC<Props> = () => {
  const { type, setType } = useTransactionToADDState((state) => state);
  const { t } = useTranslation();
  const types: TiposDeTransacciones[] = [
    t("HOME.FILTRO.INGRESO"),
    t("HOME.FILTRO.GASTO"),
    t("HOME.FILTRO.TRANSFERENCIA"),
  ] as TiposDeTransacciones[];

  return (
    <SegmentControl
      className="w-full flex-row justify-between rounded-md bg-gray-300 p-2 sm:w-[400px]"
      values={types}
      selectedIndex={type}
      onChange={setType}
    />
  );
};
