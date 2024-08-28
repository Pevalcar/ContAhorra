import { Heading } from "../ui/heading";
import { Pressable } from "../ui/pressable";
import { Text } from "../ui/text";
import type { TiposDeTransacciones } from "@/Types/types";
import { useTransactionToAdd } from "@/lib/Hooks/useTransactionToAdd";
import { useTransactionToADDState } from "@/lib/store/TransactionToAddStore";
import React from "react";
import { View } from "react-native";

interface Props {}

export const SelectorDeTipos = ({}: Props) => {
  const { type, onTypeChange } = useTransactionToAdd();

  return (
    <View className="mb-8 w-full flex-row justify-between rounded-md bg-gray-300 p-2 px-5 sm:w-[400px]">
      <MyButton title="Ingreso" selection={type} onPress={onTypeChange} />
      <MyButton title="Gasto" selection={type} onPress={onTypeChange} />
      <MyButton title="Transferencia" selection={type} onPress={onTypeChange} />
      <MyButton title="Préstamo" selection={type} onPress={onTypeChange} />
    </View>
  );
};

interface MyButonProps {
  title: TiposDeTransacciones;
  selection?: TiposDeTransacciones;
  onPress?: (value: TiposDeTransacciones) => void;
}

const MyButton = ({
  title,
  selection = "Gasto",
  onPress = () => {},
}: MyButonProps) => {
  if (selection === title) {
    return (
      <Pressable
        className="rounded-md bg-secondary-0 p-2 drop-shadow-md"
        onPress={() => onPress}
      >
        <Heading size="sm" bold>
          {title}
        </Heading>
      </Pressable>
    );
  }
  return (
    <Pressable className={"rounded-md p-2"} onPress={() => onPress(title)}>
      <Text className="text-typography-600">{title}</Text>
    </Pressable>
  );
};
