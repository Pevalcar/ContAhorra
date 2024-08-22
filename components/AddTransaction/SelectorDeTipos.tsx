import { View } from "react-native";
import { Heading } from "../ui/heading";
import { Pressable } from "../ui/pressable";
import { Text } from "../ui/text";
import type { TiposDeTransacciones } from "@/Types/Types";

const buttons: TiposDeTransacciones[] = [
  "Ingreso",
  "Gasto",
  "Préstamo",

  "Transferencia",
];

interface Props {
  slection?: TiposDeTransacciones;
  setselection?: (value: TiposDeTransacciones) => void;
}

export const SelectorDeTipos = ({
  slection = "Gasto",
  setselection = () => {},
}: Props) => {
  const handleClick = (index: TiposDeTransacciones) => {
    setselection(index);
  };

  return (
    <View className="mb-8 w-full flex-row justify-between rounded-md bg-gray-300 p-2 px-5">
      {buttons.map((title: TiposDeTransacciones, index) => (
        <MyButton
          key={index}
          title={title}
          isActive={title === slection}
          onPress={() => handleClick(title)}
        />
      ))}
    </View>
  );
};

interface MyButonProps {
  title: string;
  isActive?: boolean;
  onPress?: () => void;
}

const MyButton = ({
  title,
  isActive = false,
  onPress = () => {},
}: MyButonProps) => {
  if (isActive) {
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
    <Pressable className={"rounded-md p-2"} onPress={() => onPress()}>
      <Text className="text-typography-600">{title}</Text>
    </Pressable>
  );
};
