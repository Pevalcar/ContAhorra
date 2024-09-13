import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/ui/toast";
import React from "react";
import { Platform } from "react-native";

export const useMyToast = () => {
  const toast = useToast();
  const [toastId, setToastId] = React.useState<string>("");

  const handleToast = (tittle: string, message: string) => {
    if (!toast.isActive(toastId)) {
      const newId = Math.random();
      setToastId(newId.toString());
      toast.show({
        id: newId.toString(),
        placement: Platform.OS === "web" ? "top" : "bottom",
        duration: 3000,
        //
        render: ({ id }) => {
          const uniqueToastId = "toast-" + id;
          return (
            <Toast nativeID={uniqueToastId} action="warning" variant="solid">
              <ToastTitle>{tittle}</ToastTitle>
              <ToastDescription>{message}</ToastDescription>
            </Toast>
          );
        },
      });
    }
  };

  return { handleToast };
};
