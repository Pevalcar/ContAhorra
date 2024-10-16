import { useCategoriaStore, useCuentasStore, usePerfilesStore } from "@/lib/store";
import React from "react";
import { View } from "react-native";

export default function editor() {
  const { fetchCuentas } = useCuentasStore((state) => state);
  const { fetchPerfiles } = usePerfilesStore((state) => state);
  const { initialFetch } = useCategoriaStore((state) => state);

  React.useEffect(() => {
    const fetchData = async () => {
      await fetchCuentas();
      await initialFetch();
      await fetchPerfiles();
    };
    fetchData();
  }, []);
  return <View />;
}
