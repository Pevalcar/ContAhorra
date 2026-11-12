import { Button, ButtonText } from "./ui/button";
import { AVATAR_API_URL } from "@/lib/configs/config";
import { useStoreSesion } from "@/lib/store";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  props?: any;
}

const CustomDrawer = ({ props }: Props) => {
  const { i18n, t } = useTranslation();
  const { user } = useStoreSesion((state) => state);

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await AsyncStorage.getItem("language");
      if (savedLanguage) {
        i18n.changeLanguage(savedLanguage);
      }
    };
    loadLanguage();
  }, [i18n]);

  const handleLanguageChange = () => {
    AsyncStorage.setItem("language", i18n.language);
    i18n.changeLanguage(i18n.language === "es-CO" ? "en-US" : "es-CO");
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          backgroundColor: "#9288F9",
          marginTop: -50,
          zIndex: 10,
        }}>
        <View style={{ padding: 20 }}>
          <Image
            source={
              user?.photoURL
                ? { uri: user.photoURL }
                : require("../../assets/images/react-logo.png")
            }
            style={styles.userAvatar}
            resizeMode="cover"
          />
          <Text style={styles.userName}>{user?.full_name ?? t("name")}</Text>
        </View>
        <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{ borderTopWidth: 1, borderTopColor: "#ccc" }} />
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}>
        <Button onPress={handleLanguageChange}>
          <ButtonText>{t("change_language")}</ButtonText>
        </Button>
        <TouchableOpacity style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="exit-outline" size={22} />
            <Text style={{ fontSize: 15, marginLeft: 5 }}>{t("sign-out")}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  userAvatar: {
    height: 67.5,
    width: 67.5,
    borderRadius: 40,
    marginBottom: 8,
  },
  userName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
