import { Filtros } from "@/components/Cuentas/Filtros";
import { ListTransacciones } from "@/components/Cuentas/ListTransacciones";
import { SaldoHeading } from "@/components/Cuentas/SaldoHeading";
import { Fab, FabIcon, VStack } from "@/components/ui";
import { useStoreSesion } from "@/lib/store";
import { router } from "expo-router";
import { PlusIcon } from "lucide-react-native";
import React from "react";

export default function Index() {
  const fetchUser = useStoreSesion((state) => state.fetchUser);
  React.useEffect(() => {
    const fetchAndSetUser = async () => {
      await fetchUser();
    };
    fetchAndSetUser();
  }, []);

  return (
    <VStack className="flex-1 gap-2 p-3">
      <SaldoHeading />
      <Filtros />

      <ListTransacciones />
      <Fab
        size={"lg"}
        placement="bottom right"
        className="bg-green-500"
        onPress={() => {
          router.push("/add_tansaction");
        }}>
        <FabIcon as={PlusIcon} stroke="white" size="xl" />
      </Fab>
    </VStack>
  );
}
