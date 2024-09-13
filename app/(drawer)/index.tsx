import { Filtros } from "@/components/Cuentas/Filtros";
import { ListTransacciones } from "@/components/Cuentas/ListTransacciones";
import { SaldoHeading } from "@/components/Cuentas/SaldoHeading";
import { Screen } from "@/components/Screen";
import { Button, ButtonText } from "@/components/ui/button";
import { Fab, FabIcon } from "@/components/ui/fab";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { useFilterTrasaction } from "@/lib/Hooks/useFilterTrasaction";
import { useLocale } from "@/lib/locales/useLocale";
import { router } from "expo-router";
import { PlusIcon } from "lucide-react-native";
import React from "react";

export default function index() {
  const { filter, setSearch } = useFilterTrasaction();
  const { translations, changeLocale } = useLocale();

  return (
    <Screen>
      <VStack className="flex-1">
        <Button onPress={() => changeLocale("en")}>
          <ButtonText>{translations.t("change_language") + "  en"}</ButtonText>
        </Button>
        <Button onPress={() => changeLocale("es")}>
          <ButtonText>{translations.t("change_language") + "  es"}</ButtonText>
        </Button>
        <SaldoHeading value={500000} />
        <Filtros setFliter={setSearch} />
        <Heading size="lg" className="my-4">
          {translations.t("home.history")}
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
