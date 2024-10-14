import { HStack, Pressable } from "../ui";
import { ListEditorCategoria } from "./ListEditorCategoria";
import { ListEditorCuenta } from "./ListEditorCuenta";
import { ListEditorPerfiles } from "./ListEditorPerfiles";
import { useDarkModeStore } from "@/lib/store";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { Animated } from "react-native";

const Tab = createMaterialTopTabNavigator();
interface Props {}

const EditorList: React.FC<Props> = () => {
  const { darkMode } = useDarkModeStore((state) => state);
  return (
    <Tab.Navigator
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
};

export default EditorList;
