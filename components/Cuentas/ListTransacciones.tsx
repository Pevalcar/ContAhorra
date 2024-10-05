import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "../ui/modal";
import { TextCurrency } from "@/components/TextCurrency";
import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Transaccion } from "@/lib/domain/entities";
import { getMes, useTransaccionesStore } from "@/lib/store/TransaccionesStore";
import { t } from "i18next";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { Pressable, SectionList } from "react-native";

interface Props {}
export const ListTransacciones: React.FC<Props> = () => {
  const { getAllTransaccion, transaccionesByMonth, currentMonth, setCurrentMonth } =
    useTransaccionesStore((state) => state);
  // const { lista, month, siguienteMes, anteriorMEs } = useSorterAndAgroopList(transacciones);

  React.useEffect(() => {
    const fetchAndSetUser = async () => {
      await getAllTransaccion();
    };
    fetchAndSetUser();
  }, []);

  return (
    <>
      <HStack className="w-full items-center justify-between p-1">
        <Button onPress={() => setCurrentMonth(-1)}>
          <ButtonIcon as={ArrowLeftIcon} stroke="white" size="xl" />
        </Button>
        <DateHeaderTitle date={currentMonth} />
        <Button onPress={() => setCurrentMonth(+1)}>
          <ButtonIcon as={ArrowRightIcon} stroke="white" size="xl" />
        </Button>
      </HStack>
      <SectionList
        sections={transaccionesByMonth}
        renderItem={({ item }) => <AccordingItem item={item} index={0} />}
        renderSectionHeader={({ section: { title } }) => <DateHeader date={title} />}
        keyExtractor={(item) => item.id}
      />
    </>
  );
};

const DateHeaderTitle = ({ date }: { date: any }) => {
  const { i18n } = useTranslation();
  const newDate = getMes(date, i18n);
  return (
    <VStack className="flex-row items-center justify-between">
      <Heading>{newDate}</Heading>
    </VStack>
  );
};

interface ItemProps {
  item: Transaccion;
  index: number;
}
export const AccordingItem = ({ item, index }: ItemProps) => {
  const { deleteTransaccion, loading } = useTransaccionesStore((state) => state);
  const [showModal, setShowModal] = React.useState(false);
  const ref = React.useRef(null);
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
    if (loading) return;
    setShowModal(true);
  };

  return (
    <Card size="sm" variant="outline" className="mb-4 flex-row items-center justify-between">
      <ModalDEleteConfirm
        showModal={showModal}
        setShowModal={setShowModal}
        ref={ref}
        confirmar={() => deleteTransaccion(item.id)}
      />
      <Avatar size="md" className={bgColor()}>
        <AvatarFallbackText className="text-white">{item.type}</AvatarFallbackText>
      </Avatar>
      <VStack className="ml-4 flex-1">
        <Heading size="sm">{item.title}</Heading>
        <Text className="text-typography-500">{item.description}</Text>
        <Text className="text-typography-500">
          {new Date(item.date * 1000).toLocaleDateString()}
        </Text>
      </VStack>
      <TextCurrency
        sign
        negative={
          item.type === "Gasto" || item.type === "Transferencia" || item.type === "Préstamo"
        }
        size="sm"
        value={item.balance}
      />
      <Pressable className="mr-4 p-2" onPress={onDelete}>
        <Text>Delete</Text>
      </Pressable>
    </Card>
  );
};

export const DateHeader = ({ date }: { date: any }) => {
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

const ModalDEleteConfirm = ({ showModal, setShowModal, ref, confirmar }: any) => {
  return (
    <Modal
      isOpen={showModal}
      onClose={() => {
        setShowModal(false);
      }}
      finalFocusRef={ref}
      size="md">
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="md" className="text-typography-950">
            {t("eliminar-transaccion")}
          </Heading>
        </ModalHeader>
        <ModalBody>
          <Text>{t("confirmar-eliminar")}</Text>
        </ModalBody>
        <ModalFooter>
          <Button onPress={() => setShowModal(false)}>
            <ButtonText>{t("cancelar")}</ButtonText>
          </Button>
          <Button
            variant="outline"
            onPress={() => {
              setShowModal(false);
              confirmar();
            }}>
            <ButtonText>{t("eliminar")}</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
