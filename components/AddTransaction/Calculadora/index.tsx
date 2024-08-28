import { MyIcon } from "@/components/Icons";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { useCalculadora } from "@/lib/Hooks/useCalculadora";
import { View } from "react-native";

interface Props {}

const botones = [
  ["+", 7, 8, 9],
  ["-", 4, 5, 6],
  ["*", 1, 2, 3],
  ["/", 0, ".", "="],
];

export const Calculadora: React.FC<Props> = ({}) => {
  const { valuePantalla, setValuePantalla, reset } = useCalculadora();
  //TODO estilar mejor la calcuiladora
  return (
    <View className="w-full justify-center gap-1">
      <Pantalla onDeletePress={reset} className="col-span-4">
        {valuePantalla}
      </Pantalla>

      {botones.map((row, index) => {
        return (
          <HStack key={index} className="justify-center gap-1">
            {row.map((value, index) => (
              <BotonCalculadoraResaltado
                key={index}
                onPress={() => setValuePantalla(value)}
                variant={typeof value !== "number"}
              >
                {value}
              </BotonCalculadoraResaltado>
            ))}
          </HStack>
        );
      })}
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
      className={"flex h-14 w-full flex-row rounded-lg border " + className}
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
  onPress?: () => void;
}

const BotonCalculadoraResaltado: React.FC<BotonProps> = ({
  children,
  variant,
  onPress = () => {},
  ...props
}) => {
  return (
    <Button
      onPress={() => onPress()}
      variant={variant ? "solid" : "outline"}
      className="h-16 flex-1 active:bg-secondary-200"
      {...props}
    >
      <ButtonText className="text-center">
        {children === "/" ? "÷" : children === "*" ? "x" : children}
      </ButtonText>
    </Button>
  );
};
