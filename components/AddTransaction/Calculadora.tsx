import { useCalculadora } from "@/lib/Hooks/useCalculadora";
import { Delete } from "lucide-react-native";
import { View } from "react-native";
import { Button, ButtonIcon, ButtonText } from "../ui/button";
import { Text } from "../ui/text";

interface Props {}

const botones = [
  ["+", 7, 8, 9],
  ["-", 4, 5, 6],
  ["*", 1, 2, 3],
  ["/", 0, ".", "="],
];

export const Calculadora: React.FC<Props> = ({}) => {
  const { valuePantalla, setValuePantalla, reset } = useCalculadora();

  return (
    <View className="grid w-[400px] grid-cols-4 justify-center gap-1">
      <Pantalla onDeletePress={reset} className="col-span-4">
        {valuePantalla}
      </Pantalla>
      {botones.map((row) =>
        row.map((value, index) => (
          <BotonCalculadoraResaltado
            key={index}
            onPress={() => setValuePantalla(value)}
            variant={typeof value !== "number"}
          >
            {value}
          </BotonCalculadoraResaltado>
        )),
      )}
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
      className={"h-14 w-full flex-row rounded-lg border " + className}
      {...props}
    >
      <Text className="h-full flex-1 p-2 text-end text-3xl font-bold">
        {children}
      </Text>
      <Button className="h-full w-14" variant="link" onPress={onDeletePress}>
        <ButtonIcon as={Delete} className="text-center">
          AC
        </ButtonIcon>
      </Button>
    </View>
  );
};

interface BotonProps {
  children?: React.ReactNode;
  variant?: boolean;
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
      className="hover:bg-gray-300"
      {...props}
    >
      <ButtonText className="text-center">
        {children === "/" ? "÷" : children === "*" ? "x" : children}
      </ButtonText>
    </Button>
  );
};
