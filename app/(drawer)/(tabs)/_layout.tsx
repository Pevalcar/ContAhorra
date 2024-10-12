import { HomeIcon, MyIcon } from "@/components/Icons";
import { Tabs } from "expo-router";
import { t } from "i18next";
import React from "react";
import { useTranslation } from "react-i18next";

export default function TabLayout() {
  const { t } = useTranslation();
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: t("menu.home"),
          headerShown: false,
          tabBarIcon: ({ color, size }) => <HomeIcon color={color} size={size} />,
        }}></Tabs.Screen>
      <Tabs.Screen
        name="grafics"
        options={{
          title: t("graficos"),
          headerShown: false,
          tabBarIcon: ({ color, size }) => <MyIcon name="Wallet" color={color} size={size} />,
        }}></Tabs.Screen>
      <Tabs.Screen
        name="editor"
        options={{
          title: t("editor"),
          headerShown: false,
          tabBarIcon: ({ color, size }) => <MyIcon name="FileEdit" color={color} size={size} />,
        }}></Tabs.Screen>
    </Tabs>
  );
}
