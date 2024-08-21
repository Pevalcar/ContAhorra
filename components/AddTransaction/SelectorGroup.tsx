import type { MyIconos } from "@/Types/Types";
import React, { useState } from "react";
import { MyIcon } from "../Icons";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetVirtualizedList,
} from "../ui/actionsheet";
import { HStack } from "../ui/hstack";
import { Pressable } from "../ui/pressable";
import { Text } from "../ui/text";

interface Props {}
export const SelectorGroup: React.FC<Props> = ({}) => {
  const data = React.useMemo(
    () =>
      Array(50)
        .fill(0)
        .map((_, index) => "Item " + index),
    [],
  );
  return (
    <HStack space="4xl" className="justify-center">
      <MySelector name="Cuenta" data={data} />
      <MySelector name="Categoria" data={data} />
    </HStack>
  );
};
interface SelectorProps {
  name: string;
  icon?: MyIconos;
  data?: any[];
}
//TODO agregar iconos y contenido de el cheet

const MySelector = ({ name, icon = "Plus", data }: SelectorProps) => {
  const [selecionado, setselecionado] = useState("sinelegir");

  const [showActionsheet, setShowActionsheet] = React.useState(false);
  const handleClose = () => setShowActionsheet(false);

  const getItem = (_data: string[], index: number) => ({
    id: Math.random().toString(12).substring(0),
    title: _data[index],
  });
  const getItemCount = (_data: string[]) => _data.length;
  const Item = React.useCallback(
    ({ title }: { title: string }) => (
      <ActionsheetItem
        onPress={() => {
          setselecionado(title);
          handleClose();
        }}
      >
        <ActionsheetItemText>{title}</ActionsheetItemText>
      </ActionsheetItem>
    ),
    [handleClose],
  );
  return (
    <>
      <Pressable
        className="items-center justify-center pb-1"
        onPress={() => setShowActionsheet(true)}
      >
        <Text>{name}</Text>
        <HStack
          space="sm"
          className="w-auto items-center justify-center rounded-md border-2 border-outline-400 p-4"
        >
          <MyIcon name={icon} color="black" />
          <Text>{selecionado}</Text>
        </HStack>
      </Pressable>

      <Actionsheet
        isOpen={showActionsheet}
        onClose={handleClose}
        snapPoints={[50]}
      >
        <ActionsheetBackdrop />
        <ActionsheetContent>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <ActionsheetVirtualizedList
            h="$56"
            data={data}
            initialNumToRender={5}
            renderItem={({ item }) => <Item title={item.title} />}
            keyExtractor={(item) => item.id}
            getItemCount={getItemCount}
            getItem={getItem}
          />
        </ActionsheetContent>
      </Actionsheet>
    </>
  );
};
