import { Footer } from "./Footer";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { DEVELOPMENT } from "@/lib/config";
import useDarkModeStore from "@/lib/store/ThemeDarkMode";
import React, { ReactNode } from "react";
import { StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  children: ReactNode;
}

export function Screen({ children }: Props) {
  const isDark = useDarkModeStore((state) => state.darkMode);
  const { top } = useSafeAreaInsets();

  return (
    <SafeAreaView className="bg-primary ml-4 mr-4 flex-1" style={{ paddingTop: top }}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      {children}
      {DEVELOPMENT && <Footer></Footer>}
    </SafeAreaView>
  );
}
