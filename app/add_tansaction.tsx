import { Calculadora } from "@/components/AddTransaction/Calculadora";
import { DataInfo } from "@/components/AddTransaction/DataInfo";
import { DescripcionAddTr } from "@/components/AddTransaction/DescripcionAddTr";
import { Grupalmenu } from "@/components/AddTransaction/Grupalmenu";
import { SelectorDeTipos } from "@/components/AddTransaction/SelectorDeTipos";
import { SelectorGroup } from "@/components/AddTransaction/SelectorGroup";
import { Screen } from "@/components/Screen";
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { useMyToast } from "@/lib/Hooks/useToast";
import { useTransactionToADDState } from "@/lib/store";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";

export default function Add() {
  const { handleToast } = useMyToast();
  const { categoriSelect, saveTransaction, Error } = useTransactionToADDState((state) => state);
  const { t } = useTranslation();

  const onSaveTransaction = async () => {
    await saveTransaction()
      .then((result) => {
        router.back();
      })
      .catch((err: any) => {
        handleToast("Error al guardar la transacción", err.message, "error");
      });
  };
  return (
    <Screen>
      <HStack className="m-1 w-full items-center justify-between p-2">
        <Button
          onPress={() => {
            router.back();
          }}>
          <ButtonText>{t("back")}</ButtonText>
        </Button>
        <Button onPress={onSaveTransaction}>
          <ButtonText>{t("save")}</ButtonText>
        </Button>
      </HStack>
      <ScrollView>
        <VStack className={"mx-2 h-full items-center gap-2"}>
          <SelectorDeTipos />
          <SelectorGroup />
          {categoriSelect?.prestamo ? <Grupalmenu /> : null}
          <DescripcionAddTr />
          <Calculadora />
          <DataInfo />
        </VStack>
      </ScrollView>
    </Screen>
  );
}
