import { Footer } from "@/components/Footer";
import { ButtonSpinner, SafeAreaView } from "@/components/ui/";
import { DEVELOPMENT } from "@/lib/configs/config";
import { useDarkModeStore } from "@/lib/store/ThemeDarkMode";
import React, { ReactNode } from "react";
import { StatusBar, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  isLoading?: boolean;
  children: ReactNode;
}

export function Screen({ children, isLoading }: Props) {
  const isDark = useDarkModeStore((state) => state.darkMode);
  const { top } = useSafeAreaInsets();

  return (
    <SafeAreaView
      className="ml-4 mr-4 flex-1 bg-background-50"
      style={{ paddingTop: top, paddingBottom: 15 }}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      {isLoading ? (
        <View className="absolute bottom-0 left-0 right-0 top-0 z-20 flex h-full items-center justify-center bg-background-200/20">
          <ButtonSpinner size="large" />
        </View>
      ) : null}
      {children}
      {DEVELOPMENT && <Footer></Footer>}
    </SafeAreaView>
  );
}
