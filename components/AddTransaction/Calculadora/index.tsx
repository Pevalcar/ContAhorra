import { MyIcon } from "@/components/Icons";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { useCalculadora } from "@/lib/Hooks/useCalculadora";
import { View } from "react-native";

interface Props {}

export const Calculadora: React.FC<Props> = ({}) => {
  const { valuePantalla, setValuePantalla, reset, setSign } = useCalculadora();
  // DEVELOPMENT
  //   ? console.log(
  //       " valuePantalla",
  //       valuePantalla,
  //       " firstValue",
  //       firstValue.current,
  //       " secondValue",
  //       secondValue.current,
  //       " sign",
  //       sign.current,
  //     )
  //   : "";

  return (
    <View className="w-full justify-center gap-1">
      <Pantalla onDeletePress={reset} className="col-span-4">
        {valuePantalla}
      </Pantalla>
      <HStack className="justify-center gap-1">
        <BotonCalculadoraResaltado onPress={setSign} variant>
          +
        </BotonCalculadoraResaltado>
        <BotonCalculadoraResaltado onPress={setValuePantalla}>
          7
        </BotonCalculadoraResaltado>
        <BotonCalculadoraResaltado onPress={setValuePantalla}>
          8
        </BotonCalculadoraResaltado>
        <BotonCalculadoraResaltado onPress={setValuePantalla}>
          9
        </BotonCalculadoraResaltado>
      </HStack>

      <HStack className="justify-center gap-1">
        <BotonCalculadoraResaltado onPress={setSign} variant>
          -
        </BotonCalculadoraResaltado>
        <BotonCalculadoraResaltado onPress={setValuePantalla}>
          4
        </BotonCalculadoraResaltado>
        <BotonCalculadoraResaltado onPress={setValuePantalla}>
          5
        </BotonCalculadoraResaltado>
        <BotonCalculadoraResaltado onPress={setValuePantalla}>
          6
        </BotonCalculadoraResaltado>
      </HStack>

      <HStack className="justify-center gap-1">
        <BotonCalculadoraResaltado onPress={setSign} variant>
          *
        </BotonCalculadoraResaltado>
        <BotonCalculadoraResaltado onPress={setValuePantalla}>
          1
        </BotonCalculadoraResaltado>
        <BotonCalculadoraResaltado onPress={setValuePantalla}>
          2
        </BotonCalculadoraResaltado>
        <BotonCalculadoraResaltado onPress={setValuePantalla}>
          3
        </BotonCalculadoraResaltado>
      </HStack>
      <HStack className="justify-center gap-1">
        <BotonCalculadoraResaltado onPress={setSign} variant>
          /
        </BotonCalculadoraResaltado>
        <BotonCalculadoraResaltado onPress={setValuePantalla}>
          0
        </BotonCalculadoraResaltado>
        <BotonCalculadoraResaltado onPress={setValuePantalla}>
          .
        </BotonCalculadoraResaltado>
        <BotonCalculadoraResaltado onPress={setSign} variant>
          =
        </BotonCalculadoraResaltado>
      </HStack>
    </View>
  );
};

type PantallaProps = {
  className?: string;
  children?: React.ReactNode;
  onDeletePress?: () => void;
};

const Pantalla: React.FC<PantallaProps> = ({
  className,
  children,
  onDeletePress = () => {},
  ...props
}) => {
  return (
    <View
      className={"flex h-20 w-full flex-row rounded-lg border " + className}
      {...props}
    >
      <Heading className="mr-1 h-full flex-1 text-right align-middle text-3xl">
        {children}
      </Heading>
      <Pressable className="h-full w-14 justify-center" onPress={onDeletePress}>
        <MyIcon name="Delete" size={40} />
      </Pressable>
    </View>
  );
};

interface BotonProps {
  children?: React.ReactNode;
  variant?: boolean;
  className?: string;
  onPress?: (value: string) => void;
}

const BotonCalculadoraResaltado: React.FC<BotonProps> = ({
  children,
  variant,
  onPress = () => {},
  ...props
}) => {
  return (
    <Button
      onPress={() => onPress(children?.toString() || "")}
      variant={variant ? "solid" : "outline"}
      className="h-20 flex-1 active:bg-secondary-200"
      {...props}
    >
      <ButtonText className="text-center">
        {children === "/" ? "÷" : children === "*" ? "x" : children}
      </ButtonText>
    </Button>
  );
};
