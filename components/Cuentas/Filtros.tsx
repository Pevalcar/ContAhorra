import { Text, View } from "react-native";
import { HStack } from "../ui/hstack";
import { Button, ButtonText } from "../ui/button";
import { useState } from "react";

interface Props {}

export const Filtros = ({}: Props) => {
  const [select, setSelect] = useState(0);

  function handleClick(position: number) {
    setSelect(position);
  }

  return (
    <HStack space="xs" className="mt-4">
      <MyButton
        bgColor="bg-blue-500 "
        isActive={select === 3}
        onPress={() => handleClick(3)}
      >
        Todo
      </MyButton>
      <MyButton
        bgColor="bg-red-500 "
        isActive={select === 0}
        onPress={() => handleClick(0)}
      >
        Gasto
      </MyButton>
      <MyButton
        bgColor="bg-green-500 "
        isActive={select === 1}
        onPress={() => handleClick(1)}
      >
        ingreso
      </MyButton>
      <MyButton
        bgColor="bg-yellow-500 "
        isActive={select === 2}
        onPress={() => handleClick(2)}
      >
        Transferencia
      </MyButton>
    </HStack>
  );
};

type ButtonProsps = {
  children: React.ReactNode;
  isActive?: boolean;
  onPress?: () => void;
  bgColor?: string;
};
const MyButton = ({ children, isActive, onPress, bgColor }: ButtonProsps) => {
  return (
    <Button
      onPress={onPress}
      variant="outline"
      className={isActive ? bgColor : ""}
    >
      <ButtonText>{children}</ButtonText>
    </Button>
  );
};
