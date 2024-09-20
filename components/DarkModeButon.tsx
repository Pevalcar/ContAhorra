import { DarkModeIcon } from "./Icons";
import { Pressable } from "./ui/pressable";
import useDarkModeStore from "@/lib/store/ThemeDarkMode";
import React from "react";

interface Props {}

export const DarkModeButon: React.FC<Props> = () => {
  const darkMode = useDarkModeStore((state) => state.toggleDarkMode);
  const isDark = useDarkModeStore((state) => state.darkMode);
  return (
    <Pressable onPress={darkMode}>
      <DarkModeIcon variant={isDark} />
    </Pressable>
  );
};
