import { useTransactionToADDState } from "../store";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useEffect } from "react";

export const useDate = () => {
  const { date, setDate } = useTransactionToADDState();

  const onChange = (_: any, selectedDate: any) => {
    setDate(selectedDate);
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
    const date = new Date();
    if (date) {
      onChange("", date);
    } else {
      onChange("", date);
    }
  }, []);

  return { date, showDatepicker, showTimepicker };
};
