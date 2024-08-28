import { Filtros } from "@/components/Cuentas/Filtros";
import { ListTransacciones } from "@/components/Cuentas/ListTransacciones";
import { SaldoHeading } from "@/components/Cuentas/SaldoHeading";
import { Screen } from "@/components/Screen";
import { Fab, FabIcon } from "@/components/ui/fab";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { useFilterTrasaction } from "@/lib/Hooks/useFilterTrasaction";
import { router } from "expo-router";
import { PlusIcon } from "lucide-react-native";
import React from "react";

export default function index() {
  const { filter, setSearch } = useFilterTrasaction();

  return (
    <Screen>
      <VStack className="flex-1">
        <SaldoHeading value={500000} />
        <Filtros setFliter={setSearch} />
        <Heading size="lg" className="my-4">
          Historial
        </Heading>
        <ListTransacciones list={filter} />
        <Fab
          size={"lg"}
          placement="bottom right"
          className="bg-green-500/55"
          onPress={() => {
            router.push("/add_tansaction");
          }}
        >
          <FabIcon as={PlusIcon} />
        </Fab>
      </VStack>
    </Screen>
  );
}
