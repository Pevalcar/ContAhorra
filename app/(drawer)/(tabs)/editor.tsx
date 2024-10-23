import { ListEditorCategoria } from "@/components/Editor/ListEditorCategoria";
import { ListEditorCuenta } from "@/components/Editor/ListEditorCuenta";
import { ListEditorPerfiles } from "@/components/Editor/ListEditorPerfiles";
import { useDarkModeStore } from "@/lib/store";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useLocalSearchParams } from "expo-router";
import React from "react";

const Tab = createMaterialTopTabNavigator();

export default function editor() {
  const { darkMode } = useDarkModeStore((state) => state);
  const { type } = useLocalSearchParams<{ type?: string }>();

  return (
    <Tab.Navigator
      initialRouteName={type ?? "Categorias"}
      screenOptions={{
        lazy: true,
        tabBarPressOpacity: 1,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "800",
        },
        tabBarIndicatorStyle: {
          backgroundColor: darkMode ? "white" : "black",
        },
        tabBarContentContainerStyle: {
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 10,
        },
      }}>
      <Tab.Screen name="Categorias" component={ListEditorCategoria} />
      <Tab.Screen name="Perfiles" component={ListEditorPerfiles} />
      <Tab.Screen name="Cuentas" component={ListEditorCuenta} />
    </Tab.Navigator>
  );
}
