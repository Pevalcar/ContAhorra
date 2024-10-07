import { Filtros } from "@/components/Cuentas/Filtros";
import { ListTransacciones } from "@/components/Cuentas/ListTransacciones";
import { SaldoHeading } from "@/components/Cuentas/SaldoHeading";
import { Screen } from "@/components/Screen";
import { Button, ButtonIcon, VStack } from "@/components/ui";
import { useStoreSesion } from "@/lib/store";
import { router } from "expo-router";
import { PlusIcon } from "lucide-react-native";
import React from "react";
import { StyleSheet } from "react-native";

export default function Index() {
  const fetchUser = useStoreSesion((state) => state.fetchUser);
  React.useEffect(() => {
    const fetchAndSetUser = async () => {
      await fetchUser();
    };
    fetchAndSetUser();
  }, []);

  return (
    <Screen>
      <VStack className="mt-2 flex-1 gap-2">
        <SaldoHeading />
        <Filtros />

        <ListTransacciones />
        <Button
          size="xl"
          className="absolute bottom-4 right-4 m-11 h-16 w-16 rounded-full p-3.5"
          style={styles.shadow}
          onPress={() => {
            router.push("/add_tansaction");
          }}>
          <ButtonIcon as={PlusIcon} stroke="white" size="xl" />
        </Button>
      </VStack>
    </Screen>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 6,
  },
});
