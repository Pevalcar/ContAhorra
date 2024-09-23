import { Toast, ToastDescription, ToastTitle, useToast } from "@/components/ui/toast";
import React from "react";
import { Platform } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export const useMyToast = () => {
  const toast = useToast();
  const [toastId, setToastId] = React.useState<string>("");
  const insets = useSafeAreaInsets();

  const handleToast = React.useCallback(
    (
      tittle: string,
      message: string,
      action: "muted" | "error" | "warning" | "success" | "info" = "warning",
    ) => {
      if (!toast.isActive(toastId)) {
        const newId = Math.random();
        setToastId(newId.toString());
        toast.show({
          id: newId.toString(),
          placement: Platform.OS === "web" ? "top" : "bottom",
          duration: 3000,
          containerStyle: {
            margin: insets.top + 10,
          },
          //
          render: ({ id }) => {
            const uniqueToastId = "toast-" + id;
            return (
              <SafeAreaView style={{ flex: 1 }}>
                <Toast
                  nativeID={uniqueToastId}
                  action={action}
                  variant="solid"
                  className="justify-between gap-6 border-error-500 p-4 shadow-hard-5">
                  <ToastTitle className="text-white">{tittle}</ToastTitle>
                  <ToastDescription className="text-white">{message}</ToastDescription>
                </Toast>
              </SafeAreaView>
            );
          },
        });
      }
    },
    [],
  );

  return { handleToast };
};
