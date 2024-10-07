/* eslint-disable no-undef */
import { TiposDeTransacciones } from "@/Types/types";
import {
  addTransaccion,
  deleteTransaccion,
  getTotalTransactionByDateRange,
  getTransactionsByDateRang,
} from "@/lib/core/di/Container";
import { Transaccion } from "@/lib/domain/entities";
import { create } from "zustand";

// in web funciona como localStorage pero en android supera la capacidades de SecureStore
//TOOD web control db solo disponible en premium
// async function saveState(state: Transaccion[], key = LOCAL_DB_TRANSACCIONES_NAME) {
//   if (Platform.OS === "web") {
//     try {
//       if (state === null) {
//         localStorage.removeItem(key);
//       } else {
//         localStorage.setItem(key, JSON.stringify(state));
//       }
//     } catch (e) {
//       console.error("Local storage is unavailable:", e);
//     }
//   }
// }
//TODO implementar  reducer https://github.com/midudev/aprendiendo-react/blob/master/projects/06-shopping-cart/src/context/cart.jsx

interface ITransaccionesStore {
  transacciones: Transaccion[];
  transaccionesByMonth: { title: number; data: Transaccion[] }[];
  currentMonth: Date;
  endDate: Date;
  saldo: {
    total: number;
    totalExpenses: number;
    totalIncome: number;
  };
  loading: boolean;
  filter: TiposDeTransacciones | null;
  setCurrentMonth: (mount: number) => void;
  setFilter: (filter: TiposDeTransacciones | null) => void;
  getTotalTransaction: () => void;
  getAllTransaccion: () => void;
  addTransaccion: (transaccion: Transaccion) => void;
  deleteTransaccion: (id: string) => void;
  updateTransaccion: (transaccion: Transaccion) => void;
}

export const useTransaccionesStore = create<ITransaccionesStore>((set, get) => ({
  transacciones: [],
  transaccionesByMonth: [],
  saldo: { totalExpenses: 0, totalIncome: 0, totalTransferences: 0, totalPrestamos: 0, total: 0 },
  currentMonth: new Date(),
  endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
  loading: false,
  filter: null,
  setFilter: async (filter) => {
    set({ filter: filter, loading: true });
    await get().getAllTransaccion();
  },
  getTotalTransaction: async () => {
    const { endDate, currentMonth } = get();
    const { endOfMonthTimestamp, startOfMonthTimestamp } = getInitialAndFinalDate(
      currentMonth,
      endDate,
    );
    const resunt = await getTotalTransactionByDateRange.execute({
      startDate: startOfMonthTimestamp,
      endDate: endOfMonthTimestamp,
    });

    const newState = {
      totalExpenses: resunt.totalExpenses,
      totalIncome: resunt.totalIncome,
      total: resunt.totalIncome - resunt.totalExpenses,
    };
    set({ saldo: newState });
  },
  getAllTransaccion: async () => {
    set({ loading: true });
    //TODO ahcer la llamada con las fechas exactas
    const { currentMonth, endDate, filter } = get();
    try {
      const { endOfMonthTimestamp, startOfMonthTimestamp } = getInitialAndFinalDate(
        currentMonth,
        endDate,
      );
      const transacciones = await getTransactionsByDateRang.execute({
        endDate: endOfMonthTimestamp,
        startDate: startOfMonthTimestamp,
        type: filter,
      });
      const newState = sortByDate(transacciones);
      set({ transacciones: transacciones, transaccionesByMonth: newState, loading: false });
    } catch (e) {
      console.error("Error al guardar la transacción:", e);
      set({ loading: false });
      throw e;
    }
  },
  addTransaccion: async (transaccion: Transaccion) => {
    try {
      const { getAllTransaccion } = get();
      await addTransaccion.execute(transaccion);
      await getAllTransaccion();
    } catch (e) {
      console.error("Error al guardar la transacción:", e);
      throw e;
    }
  },
  deleteTransaccion: async (id: string) => {
    const { getAllTransaccion } = get();
    try {
      await deleteTransaccion.execute(id);
      await getAllTransaccion();
    } catch (e) {
      console.error("Error al guardar la transacción:", e);
      throw e;
    }
  },
  updateTransaccion: (transaccion: Transaccion) => {
    const { transacciones } = get();
    const newState = transacciones.map((t) => (t.id === transaccion.id ? transaccion : t));
    set({ transacciones: newState });
  },
  setCurrentMonth: async (mount: number) => {
    const { currentMonth } = get();
    const mounti = currentMonth.setMonth(currentMonth.getMonth() + mount);
    const newMonth = new Date(mounti);
    const newEnd = new Date(newMonth.getFullYear(), newMonth.getMonth() + 1, 1);
    set({ currentMonth: newMonth, endDate: newEnd });
    await get().getAllTransaccion();
  },
}));

// function newFilters(filter: number) {
//   const posibleFilter = [undefined, "Ingreso", "Transferencia", "Gasto", "Préstamo"];
//   const newFilter = posibleFilter[filter] as TiposDeTransacciones;
//   if (newFilter === null) {
//     return undefined;
//   }
//   return newFilter;
// }

function sortByDate(list: Transaccion[]): { title: number; data: Transaccion[] }[] {
  let sortedList;
  if (list.length !== 1) {
    sortedList = list.sort((a, b) => b.date - a.date);
  } else {
    sortedList = list;
  }
  let newList: { title: number; data: Transaccion[] }[] = [];
  let lasDates: string[] = [];
  // const month = new Date();

  sortedList.forEach((item) => {
    const corretDAta = item.date * 1000;
    const date = new Date(corretDAta).toLocaleDateString();
    // const mesDAte = getMes(corretDAta, i18n);
    // const currentMonth = getMes(month, i18n);
    // //TODO hay que ver que mas posibilidades den error
    // // si la fecha esta en el mes actual
    // if (mesDAte !== currentMonth) return
    if (lasDates.includes(date)) {
      // la lista nueva se compondra por  [ { title: item.date, data: [item] } ]
      //busamos el indice de la fecha en lasDates

      newList[lasDates.indexOf(date)].data = [...newList[lasDates.indexOf(date)].data, item];
      return;
    }
    // la lista nueva se compondra por  [ { title: item.date, data: [item] } ]

    lasDates.push(date);
    newList.push({ title: corretDAta, data: [item] });
  });

  return newList;
}

export function getMes(date: Date, i18n: any) {
  const month =
    date.toLocaleString(i18n.language, { month: "long" }).charAt(0).toUpperCase() +
    date.toLocaleString(i18n.language, { month: "long" }).slice(1);
  const formatMounthYear = `${month}, ${date.getFullYear()}`;
  return formatMounthYear;
}

function getInitialAndFinalDate(date: Date, end: Date) {
  const now = new Date(date);
  const endDate = new Date(end);

  // Set to the first day of the current month
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  // Get the first day of the next month, then subtract one millisecond to get the end of the current month
  const endOfMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 1);

  endOfMonth.setMilliseconds(endOfMonth.getMilliseconds() - 1);

  // Convert to Unix timestamps (seconds)
  const startOfMonthTimestamp = Math.floor(startOfMonth.getTime() / 1000);
  const endOfMonthTimestamp = Math.floor(endOfMonth.getTime() / 1000);

  return { startOfMonthTimestamp, endOfMonthTimestamp };
}
