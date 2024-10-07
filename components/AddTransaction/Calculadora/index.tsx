import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { useCalculadora } from "@/lib/Hooks/useCalculadora";
import React from "react";
import { View } from "react-native";

interface Props {}

export const Calculadora: React.FC<Props> = () => {
  const {
    handleNumberClick,
    handleOperatorClick,
    handleEqualClick,
    handleClearClick,
    handleTap,
    state,
  } = useCalculadora();

  return (
    <View className="w-full justify-center gap-1">
      <Pantalla onDeletePress={handleClearClick} className="col-span-4">
        {state.currentValue}
      </Pantalla>

      <HStack className="justify-center gap-1">
        <BotonCalculadoraResaltado onPress={handleClearClick}>C</BotonCalculadoraResaltado>
        <BotonCalculadoraResaltado onPress={() => handleTap("posneg")}>
          +/-
        </BotonCalculadoraResaltado>
        <BotonCalculadoraResaltado onPress={() => handleTap("percentage")}>
          %
        </BotonCalculadoraResaltado>
        <BotonCalculadoraResaltado variant onPress={handleOperatorClick}>
          /
        </BotonCalculadoraResaltado>
      </HStack>
      <HStack className="justify-center gap-1">
        <BotonCalculadoraResaltado onPress={handleNumberClick}>7</BotonCalculadoraResaltado>
        <BotonCalculadoraResaltado onPress={handleNumberClick}>8</BotonCalculadoraResaltado>
        <BotonCalculadoraResaltado onPress={handleNumberClick}>9</BotonCalculadoraResaltado>
        <BotonCalculadoraResaltado variant onPress={handleOperatorClick}>
          *
        </BotonCalculadoraResaltado>
      </HStack>

      <HStack className="justify-center gap-1">
        <BotonCalculadoraResaltado onPress={handleNumberClick}>4</BotonCalculadoraResaltado>
        <BotonCalculadoraResaltado onPress={handleNumberClick}>5</BotonCalculadoraResaltado>
        <BotonCalculadoraResaltado onPress={handleNumberClick}>6</BotonCalculadoraResaltado>
        <BotonCalculadoraResaltado variant onPress={handleOperatorClick}>
          -
        </BotonCalculadoraResaltado>
      </HStack>

      <HStack className="justify-center gap-1">
        <BotonCalculadoraResaltado onPress={handleNumberClick}>1</BotonCalculadoraResaltado>
        <BotonCalculadoraResaltado onPress={handleNumberClick}>2</BotonCalculadoraResaltado>
        <BotonCalculadoraResaltado onPress={handleNumberClick}>3</BotonCalculadoraResaltado>
        <BotonCalculadoraResaltado variant onPress={handleOperatorClick}>
          +
        </BotonCalculadoraResaltado>
      </HStack>
      <HStack className="justify-center gap-1">
        <BotonCalculadoraResaltado onPress={handleNumberClick}>0</BotonCalculadoraResaltado>
        <BotonCalculadoraResaltado onPress={handleNumberClick}>.</BotonCalculadoraResaltado>
        <BotonCalculadoraResaltado onPress={handleEqualClick}>=</BotonCalculadoraResaltado>
      </HStack>
    </View>
  );
};

type PantallaProps = {
  className?: string;
  children?: React.ReactNode;
  isError?: boolean;
  onDeletePress?: () => void;
  opetaror?: string;
};

const Pantalla = React.memo(pantalla);

function pantalla({ className, children, onDeletePress = () => {}, ...props }: PantallaProps) {
  return (
    <View className={"flex h-16 w-full flex-row rounded-lg border " + className} {...props}>
      <Heading className="mr-5 h-full flex-1 text-right align-middle text-3xl">{children}</Heading>
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
