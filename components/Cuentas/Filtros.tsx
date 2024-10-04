import { SegmentControl } from "../ui/segmentcontrol";
import { useTransaccionesStore } from "@/lib/store";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {}

export const Filtros: React.FC<Props> = () => {
  const { setFilter, loading, filter } = useTransaccionesStore((state) => state);
  const { t } = useTranslation();
  const filtros = [
    t("FILTROTODO"),
    t("HOME.FILTRO.INGRESO"),
    t("HOME.FILTRO.TRANSFERENCIA"),
    t("HOME.FILTRO.GASTO"),
    t("HOME.FILTRO.PRESTAMO"),
  ];
  return (
    <SegmentControl
      clasName="w-full flex-row items-center flex-wrap gap-2"
      isLoading={loading}
      values={filtros}
      selectedIndex={filtros.indexOf(filter ?? filtros[0])} //TODO corregir esto
      onChange={setFilter}
    />
  );
};
