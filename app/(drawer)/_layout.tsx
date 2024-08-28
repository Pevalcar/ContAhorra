import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import CustomDrawer from "@/components/CustomDrawer";
import {
  ListIcon,
  PiggyBankIcon,
  SettingsIcon,
  WalletIcon,
} from "@/components/Icons";
import "@/global.css";
import useDarkModeStore from "@/lib/store/ThemeDarkMode";
import * as SplashScreen from "expo-splash-screen";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const darkMode = useDarkModeStore((state) => state.darkMode);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawer props={props} />}
        screenOptions={{ headerTintColor: darkMode ? "white" : "black" }}
      >
        <Drawer.Screen
          name="index"
          options={{
            title: "Cuentas",
            drawerIcon: ({ color, size }) => (
              <PiggyBankIcon color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="bolsillo"
          options={{
            title: "Bolsillos",
            drawerIcon: ({ color, size }) => (
              <WalletIcon color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="reports"
          options={{
            title: "Reportes",
            drawerIcon: ({ color, size }) => (
              <ListIcon color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="config"
          options={{
            title: "Configuraciones",
            drawerIcon: ({ color, size }) => (
              <SettingsIcon color={color} size={size} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
