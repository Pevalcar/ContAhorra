import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";

import "@/global.css";
import { SessionProvider } from "@/lib/sesionprovider/ctx";
import useDarkModeStore from "@/lib/store/ThemeDarkMode";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { DarkModeButon } from "@/components/DarkModeButon";
import { Text } from "@/components/ui/text";
import {
  ListIcon,
  PiggyBankIcon,
  SettingsIcon,
  WalletIcon,
} from "@/components/Icons";
import { Icon } from "@/components/ui/icon";
import { PiggyBank, View } from "lucide-react-native";
import CustomDrawer from "@/components/CustomDrawer";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const darkMode = useDarkModeStore((state) => state.darkMode);

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GluestackUIProvider mode={darkMode ? "dark" : "light"}>
      <ThemeProvider value={darkMode ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen
            name="(drawer)"
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="add_tansaction"
            options={{ headerShown: false }}
          />
        </Stack>
      </ThemeProvider>
    </GluestackUIProvider>
  );
}
