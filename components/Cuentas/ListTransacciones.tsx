import { TextCurrency } from "../TextCurrency";
import { Button, ButtonIcon, ButtonText } from "../ui/button";
import { Card } from "../ui/card";
import { HStack } from "../ui/hstack";
import { Text } from "../ui/text";
import { type Transaccion } from "@/Types/types";
import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { useSorterAndAgroopList } from "@/lib/Hooks/useSorterAndAgroopList";
import { useTransaccionesStore } from "@/lib/store/TransaccionesStore";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, SectionList } from "react-native";

interface Props {
  list: Transaccion[];
}
export const ListTransacciones = ({ list }: Props) => {
  const { lista, month, siguienteMes, anteriorMEs } =
    useSorterAndAgroopList(list);

  return (
    <>
      <HStack className="w-full items-center justify-between p-1">
        <Button onPress={anteriorMEs}>
          <ButtonIcon as={ArrowLeftIcon} stroke="white" size="xl" />
        </Button>
        <Heading>{month}</Heading>
        <Button onPress={siguienteMes}>
          <ButtonIcon as={ArrowRightIcon} stroke="white" size="xl" />
        </Button>
      </HStack>
      <SectionList
        sections={lista}
        renderItem={({ item }) => <AccordingItem item={item} index={0} />}
        renderSectionHeader={({ section: { title } }) => (
          <DateHeader date={title} />
        )}
        keyExtractor={(item) => item.id}
      />
    </>
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
        <Text className="text-typography-500">
          {new Date(item.date).toLocaleDateString()}
        </Text>
      </VStack>
      <TextCurrency
        sign
        negative={
          item.type === "Gasto" ||
          item.type === "Transferencia" ||
          item.type === "Préstamo"
        }
        size="sm"
        value={item.balance}
      />
      <Pressable className="mr-4" onPress={onDelete}>
        <Text>Delete</Text>
      </Pressable>
    </Card>
  );
};

const DateHeader = ({ date }: { date: any }) => {
  return (
    <VStack className="flex-row items-center justify-between">
      <Text className="text-typography-500">{FormatedLocale({ date })}</Text>
    </VStack>
  );
};

const FormatedLocale = ({ date }: { date: any }) => {
  const { i18n } = useTranslation();
  const newDate = new Date(date);
  // ejemplo formato de fecha: Abr 03, Martes
  let formatMount = newDate.toLocaleString(i18n.language, { month: "short" });
  let formatDayWeek = newDate.toLocaleString(i18n.language, {
    weekday: "long",
  });

  formatMount = `${formatMount.charAt(0).toUpperCase()}${formatMount.slice(1)}`;
  formatDayWeek = `${formatDayWeek.charAt(0).toUpperCase()}${formatDayWeek.slice(1)}`;

  const formated = `${formatMount} ${newDate.toLocaleString(i18n.language, { day: "numeric" })}, ${formatDayWeek}`;
  return formated;
};
