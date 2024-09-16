import { Transaccion } from "@/Types/types";
import React, { useState } from "react";

export const useSorterAndAgroopList = (list: any[]) => {
  let lasDates: string[] = [];
  const [lista, setLista] = useState<
    Array<{ title: number; data: Transaccion[] }>
  >([]);

  React.useEffect(() => {
    const sortedList = list.sort((a, b) => b.date - a.date);
    let newList: Array<{ title: number; data: Transaccion[] }> = [];

    sortedList.forEach((item) => {
      const date = new Date(item.date).toLocaleDateString();
      if (lasDates.includes(date)) {
        // la lista nueva se compondra por  [ { title: item.date, data: [item] } ]
        //busamos el indice de la fecha en lasDates

        newList[lasDates.indexOf(date)].data = [
          ...newList[lasDates.indexOf(date)].data,
          item,
        ];
        return;
      }
      // la lista nueva se compondra por  [ { title: item.date, data: [item] } ]
      lasDates.push(date);
      newList.push({ title: item.date, data: [item] });
    });
    setLista(newList);
  }, [list]);

  return { lista };
};
