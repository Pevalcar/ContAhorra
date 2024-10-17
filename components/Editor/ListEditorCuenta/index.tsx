import { Text } from "@/components/ui";
import { Cuenta } from "@/lib/domain/entities";
import { useCuentasStore } from "@/lib/store";
import { View } from "react-native";

export const ListEditorCuenta = () => {
  const { cuentas, loagin } = useCuentasStore((state) => state);
  return (
    <View>
      {cuentas.map((c: Cuenta) => (
        <Text key={c.id}>{c.name}</Text>
      ))}
    </View>
  );
};
