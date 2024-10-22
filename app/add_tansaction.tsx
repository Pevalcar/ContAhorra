import {
  Calculadora,
  DataInfo,
  DescripcionAddTr,
  Grupalmenu,
  SelectorDeTipos,
  SelectorGroup,
} from "@/components/AddTransaction/";
import { Screen } from "@/components/Screen";
import { Button, ButtonText, HStack, VStack } from "@/components/ui/";
import { useMyToast } from "@/lib/Hooks/useToast";
import { useTransactionToADDState } from "@/lib/store";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet } from "react-native";

export default function Add() {
  const { handleToast } = useMyToast();
  const { categoriSelect, saveTransaction, loagin, reset } = useTransactionToADDState(
    (state) => state,
  );
  const { t } = useTranslation();

  const onSaveTransaction = async () => {
    await saveTransaction()
      .then((_) => {
        router.back();
      })
      .catch((err: any) => {
        handleToast(t("error-al-guardar-la-transaccion"), err.message, "error");
      });
  };
  return (
    <Screen isLoading={loagin}>
      <HStack className="m-1 w-full items-center justify-between p-2">
        <Button
          onPress={() => {
            reset();
            router.back();
          }}>
          <ButtonText>{t("back")}</ButtonText>
        </Button>
      </HStack>
      <ScrollView className="pb-5">
        <VStack className="mx-2 h-full items-center gap-2">
          <SelectorDeTipos />
          <SelectorGroup />
          {categoriSelect?.prestamo ? <Grupalmenu /> : null}
          <DescripcionAddTr />
          <Calculadora />
          <DataInfo />
          <Button
            size="lg"
            className="h-16 w-full rounded-full p-3.5"
            isDisabled={loagin}
            onPress={onSaveTransaction}
            style={styles.shadow}>
            <ButtonText>{t("save")}</ButtonText>
          </Button>
        </VStack>
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
