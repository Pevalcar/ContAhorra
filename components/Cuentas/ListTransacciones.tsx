import { TransacctionCard } from "../TransacctionCard";
import {
  Badge,
  BadgeText,
  Button,
  ButtonIcon,
  HStack,
  Heading,
  Text,
  VStack,
} from "@/components/ui/";
import { FormatedLocale } from "@/lib/Helpers/formaters";
import { usePerfilesStore } from "@/lib/store";
import { getMes, useTransaccionesStore } from "@/lib/store/TransaccionesStore";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { SectionList } from "react-native";

interface Props {}

export const ListTransacciones: React.FC<Props> = () => {
  const { getAllTransaccion, transaccionesByMonth, currentMonth, setCurrentMonth } =
    useTransaccionesStore((state) => state);
  const { fetchPerfiles } = usePerfilesStore((state) => state);
  // const { lista, month, siguienteMes, anteriorMEs } = useSorterAndAgroopList(transacciones);

  React.useEffect(() => {
    const fetchAndSetUser = async () => {
      await getAllTransaccion();
      await fetchPerfiles();
    };
    fetchAndSetUser();
  }, []);

  return (
    <VStack className="flex-1">
      <HStack className="w-full items-center justify-between p-1">
        <Button onPress={() => setCurrentMonth(-1)}>
          <ButtonIcon as={ArrowLeftIcon} size="xl" />
        </Button>
        <DateHeaderTitle date={currentMonth} />
        <Button onPress={() => setCurrentMonth(+1)}>
          <ButtonIcon as={ArrowRightIcon} size="xl" />
        </Button>
      </HStack>
      <SectionList
        sections={transaccionesByMonth}
        renderItem={({ item }) => <TransacctionCard item={item} key={item.id} />}
        renderSectionHeader={({ section: { title } }) => <DateHeader date={title} key={title} />}
        keyExtractor={(item) => item.id}
      />
    </VStack>
  );
};

const DateHeaderTitle = React.memo(({ date }: { date: any }) => {
  const { i18n } = useTranslation();
  const newDate = getMes(date, i18n);
  return (
    <VStack className="flex-row items-center justify-between">
      <Heading>{newDate}</Heading>
    </VStack>
  );
});

const DateHeader = ({ date }: { date: any }) => {
  return (
    <VStack className="flex-row items-center justify-between">
      <Text className="text-typography-500">{FormatedLocale({ date })}</Text>
    </VStack>
  );
};
