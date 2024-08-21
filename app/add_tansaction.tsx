import { DataInfo } from "@/components/AddTransaction/DataInfo";
import { SelectorDeTipos } from "@/components/AddTransaction/SelectorDeTipos";
import { SelectorGroup } from "@/components/AddTransaction/SelectorGroup";
import { Screen } from "@/components/Screen";
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import type { TiposDeTransacciones } from "@/Types/Types";
import { useState } from "react";

export default function Add() {
  const [setselection, setSetselection] =
    useState<TiposDeTransacciones>("Gasto");
  return (
    <Screen>
      <SelectorDeTipos slection={setselection} setselection={setSetselection} />
      <SelectorGroup />
      <Text>Descryption</Text>
      <Text>Cantidad</Text>
      <Text>numeros paanel</Text>
      <DataInfo />
      <Button>
        <ButtonText>Agregar Transacción</ButtonText>
      </Button>
    </Screen>
  );
}
