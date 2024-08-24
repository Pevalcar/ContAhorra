import { Divider } from "@/components/ui/divider";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import { Pressable } from "react-native";

interface Props {}

export const DataInfo = ({}: Props) => {
  const [date, setDate] = useState(new Date(1598051730000));

  useEffect(() => {
    setDate(new Date());
  }, []);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setDate(currentDate);
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
