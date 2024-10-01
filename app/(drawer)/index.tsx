import { Filtros } from "@/components/Cuentas/Filtros";
import { ListTransacciones } from "@/components/Cuentas/ListTransacciones";
import { SaldoHeading } from "@/components/Cuentas/SaldoHeading";
import { Screen } from "@/components/Screen";
import { Button, ButtonText } from "@/components/ui/button";
import { Fab, FabIcon } from "@/components/ui/fab";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useFilterTrasaction } from "@/lib/Hooks/useFilterTrasaction";
import { useStoreSesion } from "@/lib/providers/ctx";
import { router } from "expo-router";
import { t } from "i18next";
import { PlusIcon } from "lucide-react-native";
import React from "react";

export default function Index() {
  const { filter, setSearch } = useFilterTrasaction();
  const user = useStoreSesion((state) => state.user);
  const fetchUser = useStoreSesion((state) => state.fetchUser);
  const isLoading = useStoreSesion((state) => state.isLoading);
  React.useEffect(() => {
    const fetchAndSetUser = async () => {
      await fetchUser();
    };
    fetchAndSetUser();
  }, []);

  return (
    <Screen>
      {isLoading ? <Text>loading</Text> : <Text>{user?.email ?? "no user"}</Text>}
      <Button
        onPress={() => {
          router.push("/login");
        }}>
        <ButtonText>{"login"}</ButtonText>
      </Button>
      <VStack className="flex-1">
        <SaldoHeading />
        <Filtros setFliter={setSearch} />
        <Heading size="lg" className="my-4">
          {t("home.history")}
        </Heading>
        <ListTransacciones list={filter} />
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
    </Screen>
  );
}
