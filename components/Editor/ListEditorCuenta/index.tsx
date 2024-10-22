import { Text } from "@/components/ui";
import { Cuenta } from "@/lib/domain/entities";
import { useCuentasStore } from "@/lib/store";
import React from "react";
import { View } from "react-native";

export const ListEditorCuenta = () => {
  const { cuentas, loagin, fetchCuentas } = useCuentasStore((state) => state);

  React.useEffect(() => {
    const fetchData = async () => {
      await fetchCuentas();
    };
    fetchData();
  }, []);
  return (
    <View>
      {loagin ? <Text>Cargando cuentas</Text> : null}
      {cuentas.map((c: Cuenta) => (
        <Text key={c.id}>{c.name}</Text>
      ))}
    </View>
  );
};
