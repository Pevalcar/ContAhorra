import { Button, ButtonGroup, ButtonText } from "../button";
import React from "react";
import { Text, View } from "react-native";

interface Props {
  values: string[];
  selectedIndex: number | null;
  onChange: (index: number) => void;
  isLoading?: boolean;
  clasName?: string;
  buttonsClassName?: string;
}

export function SegmentControl({
  values,
  clasName,
  isLoading,
  selectedIndex,
  onChange,
  buttonsClassName,
}: Props) {
  const [selected, setSelected] = React.useState(selectedIndex ?? 0);

  const handleChange = (index: number) => {
    setSelected(index);
    onChange && onChange(index);
  };

  return (
    <View
      className={
        clasName + " flex items-center justify-center gap-2 rounded-lg bg-background-100/50 p-4"
      }>
      {values.map((value, index) => (
        <Buttons
          disabled={isLoading}
          key={index}
          className={buttonsClassName}
          onClick={() => handleChange(index)}
          selected={index === selected}>
          <Text>{value}</Text>
        </Buttons>
      ))}
    </View>
  );
}

interface ButtonsProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  selected: boolean;
  disabled?: boolean;
}

const Buttons = React.memo(({ children, className, onClick, selected, disabled }: ButtonsProps) => {
  return (
    <Button
      className={className + " "}
      variant={selected ? "solid" : "outline"}
      onPress={onClick}
      isDisabled={disabled}>
      <ButtonText>{children}</ButtonText>
    </Button>
  );
});
