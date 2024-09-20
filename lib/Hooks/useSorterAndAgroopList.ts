/* eslint-disable react-hooks/exhaustive-deps */
import { useTransaccionesStore } from "../store/TransaccionesStore";
import { Transaccion } from "@/Types/types";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export const useSorterAndAgroopList = (list: any[]) => {
  const setMes = useTransaccionesStore((state) => state.setMes);
  const transacciones = useTransaccionesStore((state) => state.transacciones);
  const { i18n, t } = useTranslation();
  let lasDates: string[] = [];
  const mes = useRef("");
  const [month, setMonth] = useState(new Date());
  const [lista, setLista] = useState<{ title: number; data: Transaccion[] }[]>([]);

  const getMouth = React.useCallback(
    (date: Date) => {
      const newMont = new Date(date);
      mes.current = getMes(newMont, i18n);
      setMonth(newMont);
    },
    [i18n],
  );

  React.useEffect(() => {
    getMouth(new Date());
  }, [getMouth, transacciones]);

  //Actualizar cuando el dimima cambie
  React.useEffect(() => {
    getMouth(month);
  }, [t]);

  React.useEffect(() => {
    const sortedList = list.sort((a, b) => b.date - a.date);
    let newList: { title: number; data: Transaccion[] }[] = [];
    let listanueva: Transaccion[] = [];

    sortedList.forEach((item) => {
      const date = new Date(item.date).toLocaleDateString();
      const mesDAte = getMes(new Date(item.date), i18n);
      const currentMonth = getMes(month, i18n);

      // si la fecha esta en el mes actual
      if (mesDAte !== currentMonth) return;
      listanueva.push(item);

      if (lasDates.includes(date)) {
        // la lista nueva se compondra por  [ { title: item.date, data: [item] } ]
        //busamos el indice de la fecha en lasDates

        newList[lasDates.indexOf(date)].data = [...newList[lasDates.indexOf(date)].data, item];
        return;
      }
      // la lista nueva se compondra por  [ { title: item.date, data: [item] } ]
      lasDates.push(date);
      newList.push({ title: item.date, data: [item] });
    });
    setMes(listanueva);
    setLista(newList);
  }, [list, month]);

  function siguienteMes() {
    const formatMount = new Date(month.setMonth(month.getMonth() + 1));
    getMouth(formatMount);
  }
  function anteriorMEs() {
    const formatMount = new Date(month.setMonth(month.getMonth() - 1));
    getMouth(formatMount);
  }

  return { lista, month: mes.current, siguienteMes, anteriorMEs };
};

function getMes(date: Date, i18n: any) {
  const month =
    date.toLocaleString(i18n.language, { month: "long" }).charAt(0).toUpperCase() +
    date.toLocaleString(i18n.language, { month: "long" }).slice(1);
  const formatMounthYear = `${month}, ${date.getFullYear()}`;
  return formatMounthYear;
}
