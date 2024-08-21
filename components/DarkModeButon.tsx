import useDarkModeStore from "@/lib/stores/ThemeDarkMode";
import { Text, View } from "react-native";
import { Pressable } from "./ui/pressable";
import { DarkModeIcon } from "./Icons";

interface Props {}

export const DarkModeButon = ({}: Props) => {
  const darkMode = useDarkModeStore((state) => state.toggleDarkMode);
  const isDark = useDarkModeStore((state) => state.darkMode);
  return (
    <Pressable onPress={darkMode}>
      <DarkModeIcon variant={isDark} />
    </Pressable>
  );
};
