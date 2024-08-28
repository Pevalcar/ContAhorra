import { Divider } from "@/components/ui/divider";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { useTransactionToAdd } from "@/lib/Hooks/useTransactionToAdd";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import { Pressable } from "react-native";

interface Props {}

const useDate = () => {
  const [date, setDate] = useState<Date>(new Date());
  const { currentDate, onDateChange } = useTransactionToAdd();

  const onChange = (_: any, selectedDate: any) => {
    setDate(selectedDate);
    onDateChange(selectedDate);
  };
  const showMode = (currentMode: any) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  useEffect(() => {
    currentDate ? onChange("", currentDate) : onChange("", new Date());
  }, []);

  return { date, showDatepicker, showTimepicker };
};

export const DataInfo = ({}: Props) => {
  const { date, showDatepicker, showTimepicker } = useDate();

  return (
    <HStack className="w-full items-center justify-between p-2">
      <MyButton onPress={showDatepicker}>{date.toLocaleDateString()}</MyButton>
      <Divider orientation="vertical" className="mx-2" />
      <MyButton onPress={showTimepicker}>{date.toLocaleTimeString()}</MyButton>
    </HStack>
  );
};

interface PropsButton {
  onPress?: () => void;
  children?: React.ReactNode;
}

const MyButton: React.FC<PropsButton> = ({ onPress = () => {}, children }) => {
  return (
    <Pressable
      className="flex-1 rounded-md bg-secondary-200 p-2 active:bg-secondary-300"
      onPress={onPress}
    >
      <Text bold className="text-center">
        {children}
      </Text>
    </Pressable>
  );
};
