import { Calculadora } from "@/components/AddTransaction/Calculadora";
import { DataInfo } from "@/components/AddTransaction/DataInfo";
import { DescripcionAddTr } from "@/components/AddTransaction/DescripcionAddTr";
import { Grupalmenu } from "@/components/AddTransaction/Grupalmenu";
import { SelectorDeTipos } from "@/components/AddTransaction/SelectorDeTipos";
import { SelectorGroup } from "@/components/AddTransaction/SelectorGroup";
import { Screen } from "@/components/Screen";
import { Fab, FabLabel, Progress, Spinner } from "@/components/ui";
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { useMyToast } from "@/lib/Hooks/useToast";
import { useTransactionToADDState } from "@/lib/store";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";

export default function Add() {
  const { handleToast } = useMyToast();
  const { categoriSelect, saveTransaction, loagin } = useTransactionToADDState((state) => state);
  const { t } = useTranslation();

  const onSaveTransaction = async () => {
    await saveTransaction()
      .then((_) => {
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
      </HStack>
      <ScrollView className="pb-5">
        {loagin ? (
          <View className="absolute bottom-0 left-0 right-0 top-0 z-20 flex h-full items-center justify-center bg-background-200/20">
            <Spinner size="large" />
          </View>
        ) : null}
        <VStack className={"mx-2 h-full items-center gap-2"}>
          <SelectorDeTipos />
          <SelectorGroup />
          {categoriSelect?.prestamo ? <Grupalmenu /> : null}
          <DescripcionAddTr />
          <Calculadora />
          <DataInfo />
        </VStack>
        <Fab
          size="lg"
          className="px-20"
          placement="bottom center"
          isDisabled={loagin}
          onPress={onSaveTransaction}
          style={styles.shadow}>
          <FabLabel className="text-white dark:text-black">{t("save")}</FabLabel>
        </Fab>
      </ScrollView>
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
