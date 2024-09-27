import CustomDrawer from "@/components/CustomDrawer";
import { ListIcon, PiggyBankIcon, SettingsIcon, WalletIcon } from "@/components/Icons";
import { useDarkModeStore } from "@/lib/store/ThemeDarkMode";
import { Drawer } from "expo-router/drawer";
import * as SplashScreen from "expo-splash-screen";
import React from "react";
import { useTranslation } from "react-i18next";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  const darkMode = useDarkModeStore((state) => state.darkMode);
  const { t } = useTranslation();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawer props={props} />}
        screenOptions={{ headerTintColor: darkMode ? "white" : "black" }}>
        <Drawer.Screen
          name="index"
          options={{
            title: t("cuentas"),
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
