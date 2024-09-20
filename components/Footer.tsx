import { Text } from "./ui/text";
import useDebuger from "@/lib/Hooks/useDebuger";
import React from "react";
import { View } from "react-native";

interface Props {}

export const Footer: React.FC<Props> = () => {
  const title = useDebuger((state) => state.title);
  const message = useDebuger((state) => state.message);
  return (
    <View className="absolute bottom-4 left-4 z-10 rounded-3xl bg-black/70 p-5 pb-6 pt-2 text-left opacity-95 backdrop-blur">
      {title && <Text className="m-0 flex text-white">{title}</Text>}
      <Text className="m-0 flex text-white">{message}</Text>
    </View>
  );
};
