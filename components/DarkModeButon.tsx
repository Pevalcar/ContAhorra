import { DarkModeIcon, MyIcon } from "./Icons";
import { Pressable } from "./ui/pressable";
import { useDarkModeStore } from "@/lib/store/";
import React from "react";

interface Props {}

export const DarkModeButon: React.FC<Props> = () => {
  const darkMode = useDarkModeStore((state) => state.toggleDarkMode);
  const isDark = useDarkModeStore((state) => state.darkMode);
  return (
    <Pressable onPress={darkMode}>
      <DarkModeIcon color={isDark ? "#fff" : "#000"} variant={isDark} size={24} />
    </Pressable>
  );
};
