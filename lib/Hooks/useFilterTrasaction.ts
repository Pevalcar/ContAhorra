import { Transaccion } from "../domain/entities";
import { useTransaccionesStore } from "../store/TransaccionesStore";
import { TiposDeTransacciones } from "@/Types/types";
import React from "react";

export const useFilterTrasaction = () => {
  const transacciones = useTransaccionesStore((state) => state.transacciones);
  const [filter, setFilter] = React.useState<Transaccion[]>(transacciones);
  const [search, setSearch] = React.useState<TiposDeTransacciones | null>(null);

  React.useEffect(() => {
    if (search) {
      const newFilter = transacciones.filter(
        (transaccion) => transaccion.type.localeCompare(search) === 0,
      );
      setFilter(newFilter);
    } else if (search === null) {
      if (transacciones) {
        setFilter(transacciones);
      }
    }
  }, [transacciones, search]);

  return { filter, setSearch };
};
