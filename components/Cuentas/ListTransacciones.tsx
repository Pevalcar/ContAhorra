import { TextCurrency } from "../TextCurrency";
import { Card } from "../ui/card";
import { Text } from "../ui/text";
import { type Transaccion } from "@/Types/types";
import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { useTransaccionesStore } from "@/lib/store/TransaccionesStore";
import React from "react";
import { FlatList, Pressable, ScrollView } from "react-native";

interface Props {
  list: Transaccion[];
}
export const ListTransacciones = ({ list }: Props) => {
  return (
    <FlatList
      data={list}
      renderItem={({ item, index }) => (
        <>
          {item.type === "Transferencia" && <Text>Transferencia</Text>}
          {item.type === "Ingreso" && <Text>Ingreso</Text>}
          {item.type === "Gasto" && <Text>Gasto</Text>}
          <AccordingItem item={item} index={index} />
        </>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};
interface ItemProps {
  item: Transaccion;
  index: number;
}
const AccordingItem = ({ item, index }: ItemProps) => {
  const deleteTransaccion = useTransaccionesStore(
    (state) => state.deleteTransaccion,
  );
  const bgColor = () => {
    switch (item.type) {
      case "Ingreso":
        return "bg-green-500";
      case "Gasto":
        return "bg-red-500";
      case "Transferencia":
        return "bg-yellow-500";
      case "Préstamo":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  const onDelete = () => {
    deleteTransaccion(item.id);
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
        negative={item.type === "Gasto" || item.type === "Transferencia"}
        size="sm"
        value={item.balance}
      />
      <Pressable className="mr-4" onPress={onDelete}>
        <Text>Delete</Text>
      </Pressable>
    </Card>
  );
};
