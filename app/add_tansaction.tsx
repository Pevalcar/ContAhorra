import { Calculadora } from "@/components/AddTransaction/Calculadora";
import { DataInfo } from "@/components/AddTransaction/DataInfo";
import { DescripcionAddTr } from "@/components/AddTransaction/DescripcionAddTr";
import { SelectorDeTipos } from "@/components/AddTransaction/SelectorDeTipos";
import { SelectorGroup } from "@/components/AddTransaction/SelectorGroup";
import { Screen } from "@/components/Screen";
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { useMediaQuery } from "@/components/ui/utils/use-media-query";
import { VStack } from "@/components/ui/vstack";
import { useTransactionToAdd } from "@/lib/Hooks/useTransactionToAdd";
import { router } from "expo-router";
import { ScrollView } from "react-native";

export default function Add() {
  const { saveTransaction, isMobile } = useTransactionToAdd();

  return (
    <Screen>
      <HStack className="w-full items-center justify-between p-2">
        <Button
          onPress={() => {
            router.back();
          }}
        >
          <ButtonText>Cancera</ButtonText>
        </Button>
        <Button onPress={saveTransaction}>
          <ButtonText>Guardar</ButtonText>
        </Button>
      </HStack>
      <ScrollView>
        <VStack
          className={
            "mx-2 h-full items-center gap-1" +
            (isMobile ? "w-full" : "w-[400px]")
          }
        >
          <SelectorDeTipos />
          <SelectorGroup />
          <DescripcionAddTr />

          <Calculadora />
          <DataInfo />
        </VStack>
      </ScrollView>
    </Screen>
  );
}
