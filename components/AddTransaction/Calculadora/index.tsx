import { MyIcon } from "@/components/Icons";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { useCalculadora } from "@/lib/Hooks/useCalculadora";
import React from "react";
import { View } from "react-native";

interface Props {}

export const Calculadora: React.FC<Props> = () => {
  const { calculator, state } = useCalculadora();
  const onHandlePress = React.useCallback((type, value) => {
    calculator(type, value);
  }, []);

  const onSignPress = React.useCallback((value: string) => {
    // setSign(value);
  }, []);

  const onDeletePress = React.useCallback(() => {
    // reset();
  }, []);

  return (
    <View className="w-full justify-center gap-1">
      <Pantalla onDeletePress={onDeletePress} className="col-span-4">
        {parseFloat("500000").toLocaleString()}
      </Pantalla>

      <HStack className="justify-center gap-1">
        <BotonCalculadoraResaltado onPress={onSignPress} variant>
          +
        </BotonCalculadoraResaltado>
        <BotonCalculadoraResaltado onPress={onHandlePress}>7</BotonCalculadoraResaltado>
        <BotonCalculadoraResaltado onPress={onHandlePress}>8</BotonCalculadoraResaltado>
        <BotonCalculadoraResaltado onPress={onHandlePress}>9</BotonCalculadoraResaltado>
      </HStack>

      <HStack className="justify-center gap-1">
        <BotonCalculadoraResaltado onPress={onSignPress} variant>
          -
        </BotonCalculadoraResaltado>
        <BotonCalculadoraResaltado onPress={onHandlePress}>4</BotonCalculadoraResaltado>
        <BotonCalculadoraResaltado onPress={onHandlePress}>5</BotonCalculadoraResaltado>
        <BotonCalculadoraResaltado onPress={onHandlePress}>6</BotonCalculadoraResaltado>
      </HStack>

      <HStack className="justify-center gap-1">
        <BotonCalculadoraResaltado onPress={onSignPress} variant>
          *
        </BotonCalculadoraResaltado>
        <BotonCalculadoraResaltado onPress={onHandlePress}>1</BotonCalculadoraResaltado>
        <BotonCalculadoraResaltado onPress={onHandlePress}>2</BotonCalculadoraResaltado>
        <BotonCalculadoraResaltado onPress={onHandlePress}>3</BotonCalculadoraResaltado>
      </HStack>
      <HStack className="justify-center gap-1">
        <BotonCalculadoraResaltado onPress={onSignPress} variant>
          /
        </BotonCalculadoraResaltado>
        <BotonCalculadoraResaltado onPress={onHandlePress}>0</BotonCalculadoraResaltado>
        <BotonCalculadoraResaltado onPress={onHandlePress}>.</BotonCalculadoraResaltado>
        <BotonCalculadoraResaltado onPress={onSignPress} variant>
          =
        </BotonCalculadoraResaltado>
      </HStack>
    </View>
  );
};

type PantallaProps = {
  className?: string;
  children?: React.ReactNode;
  isError?: boolean;
  onDeletePress?: () => void;
};

const Pantalla = React.memo(pantalla);

function pantalla({ className, children, onDeletePress = () => {}, ...props }: PantallaProps) {
  return (
    <View className={"flex h-20 w-full flex-row rounded-lg border " + className} {...props}>
      <Heading className="mr-1 h-full flex-1 text-right align-middle text-3xl">{children}</Heading>
      <Pressable className="h-full w-14 justify-center" onPress={onDeletePress}>
        <MyIcon name="Delete" size={40} color="black" />
      </Pressable>
    </View>
  );
}
interface BotonProps {
  children?: React.ReactNode;
  variant?: boolean;
  className?: string;
  onPress?: (value: string) => void;
}

const BotonCalculadoraResaltado = React.memo(botonCalculadoraResaltado);

function botonCalculadoraResaltado({
  children,
  variant,
  onPress = () => {},
  ...props
}: BotonProps) {
  return (
    <Button
      onPress={() => onPress(children?.toString() || "")}
      variant={variant ? "solid" : "outline"}
      className="h-20 flex-1 active:bg-secondary-200"
      {...props}>
      <ButtonText className="text-center">
        {children === "/" ? "÷" : children === "*" ? "x" : children}
      </ButtonText>
    </Button>
  );
}
