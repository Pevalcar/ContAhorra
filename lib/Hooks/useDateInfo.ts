import { useTransactionToAdd } from "./useTransactionToAdd";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useState, useEffect } from "react";

export const useDate = () => {
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
