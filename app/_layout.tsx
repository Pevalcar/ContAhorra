import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import "@/i18n";
import { LOCAL_DB_NAME } from "@/lib/configs/config";
import { migrateDbIfNeeded } from "@/lib/data/local/db/SQLiteDataBAse";
import { useDarkModeStore } from "@/lib/store/ThemeDarkMode";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { SQLiteProvider } from "expo-sqlite";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const darkMode = useDarkModeStore((state) => state.darkMode);

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  React.useEffect(() => {
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
        <SafeAreaProvider>
          <SQLiteProvider databaseName={LOCAL_DB_NAME} onInit={migrateDbIfNeeded}>
            <Stack>
              <Stack.Screen
                name="(drawer)"
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen name="add_tansaction" options={{ headerShown: false }} />
              <Stack.Screen name="add_perfil" options={{ headerShown: false }} />

              <Stack.Screen name="login" options={{ headerShown: false }} />
            </Stack>
          </SQLiteProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </GluestackUIProvider>
  );
}
