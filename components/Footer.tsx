import useDebuger from "@/lib/Hooks/useDebuger";
import { StyleSheet } from "nativewind";
import { Text, View } from "react-native";

interface Props {}

export const Footer: React.FC<Props> = ({}) => {
  const title = useDebuger((state) => state.title);
  const message = useDebuger((state) => state.message);
  return (
    <View className="fixed bottom-4 left-4 z-10 rounded-3xl bg-black/70 p-5 pb-6 pt-2 text-left opacity-95 backdrop-blur">
      {title && <Text style={style.h4}>{title}</Text>}
      <Text style={style.h4}>{message}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  span: {
    fontSize: 14,
    color: "#09f",
    opacity: 0.8,
  },
  h4: {
    margin: 0,
    display: "flex",
  },
});
