import CustomDrawer from "@/components/CustomDrawer";
import { ListIcon, PiggyBankIcon, SettingsIcon, WalletIcon } from "@/components/Icons";
import { useDarkModeStore } from "@/lib/store/ThemeDarkMode";
import { useSegments } from "expo-router";
import { Drawer } from "expo-router/drawer";
import * as SplashScreen from "expo-splash-screen";
import React from "react";
import { useTranslation } from "react-i18next";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
export default function RootLayout({}) {
  const darkMode = useDarkModeStore((state) => state.darkMode);
  const { t } = useTranslation();
  const segments = useSegments();

  const segment = () => {
    if (segments.length > 2) {
      const segment = segments[2];
      if (segment === "editor") {
        return t("editor");
      } else if (segment === "grafics") {
        return t("graficos");
      }
    }
    return t("cuentas");
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawer props={props} />}
        screenOptions={{ headerTintColor: darkMode ? "white" : "black" }}>
        <Drawer.Screen
          name="(tabs)"
          options={{
            headerTitle: segment(),
            drawerLabel: t("cuentas"),
            drawerIcon: ({ color, size }) => <PiggyBankIcon color={color} size={size} />,
          }}
        />
        <Drawer.Screen
          name="bolsillo"
          options={{
            title: t("pocket"),
            drawerIcon: ({ color, size }) => <WalletIcon color={color} size={size} />,
          }}
        />
        <Drawer.Screen
          name="reports"
          options={{
            title: t("reports"),
            drawerIcon: ({ color, size }) => <ListIcon color={color} size={size} />,
          }}
        />
        <Drawer.Screen
          name="config"
          options={{
            title: t("config"),
            drawerIcon: ({ color, size }) => <SettingsIcon color={color} size={size} />,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
