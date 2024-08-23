import { Calculadora } from "@/components/AddTransaction/Calculadora";
import { DataInfo } from "@/components/AddTransaction/DataInfo";
import { SelectorDeTipos } from "@/components/AddTransaction/SelectorDeTipos";
import { SelectorGroup } from "@/components/AddTransaction/SelectorGroup";
import { Screen } from "@/components/Screen";
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { type TiposDeTransacciones } from "@/Types/types";
import { useState } from "react";

export default function Add() {
  const [setselection, setSetselection] =
    useState<TiposDeTransacciones>("Gasto");
  return (
    <Screen>
      <VStack className="items-center">
        <SelectorDeTipos
          slection={setselection}
          setselection={setSetselection}
        />
        <SelectorGroup />
        <Text>Descryption</Text>
        <Calculadora />
        <DataInfo />
        <Button>
          <ButtonText>Agregar Transacción</ButtonText>
        </Button>
      </VStack>
    </Screen>
  );
}
