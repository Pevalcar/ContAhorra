import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";

import type { Transaccion } from "@/Types/Types";
import React from "react";
import { ScrollView } from "react-native";
import { TextCurrency } from "../TextCurrency";
import { Card } from "../ui/card";
import { Text } from "../ui/text";
interface Props {
  list: Transaccion[];
}
export const ListTransacciones = ({ list }: Props) => {
  return (
    <ScrollView style={{ flex: 1 }}>
      {list.map((item, index) => (
        <AccordingItem key={index} item={item} index={index} />
      ))}
    </ScrollView>
  );
};
interface ItemProps {
  item: Transaccion;
  index: number;
}
const AccordingItem = ({ item, index }: ItemProps) => {
  const bgColor = () => {
    switch (item.type) {
      case "ingreso":
        return "bg-green-500";
      case "gasto":
        return "bg-red-500";
      case "transferencia":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };
  return (
    <Card
      size="sm"
      variant="outline"
      className="mb-4 flex-row items-center justify-between"
    >
      <Avatar size="md" className={bgColor()}>
        <AvatarFallbackText className="text-white">
          {item.type}
        </AvatarFallbackText>
      </Avatar>
      <VStack className="ml-4 flex-1">
        <Heading size="sm">{item.title}</Heading>
        <Text className="text-typography-500">{item.description}</Text>
        <Text className="text-typography-500">{item.date}</Text>
      </VStack>
      <TextCurrency
        sign
        negative={item.type === "gasto" || item.type === "transferencia"}
        size="sm"
        value={item.balance}
      />
    </Card>
  );
};
