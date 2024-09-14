import { Button, ButtonText } from "./ui/button";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  props?: any;
}

//TODO modificar y mejorar el dawler

const CustomDrawer = ({ props }: Props) => {
  const { i18n, t } = useTranslation();

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
    if (i18n.language === "es-CO") {
      i18n.changeLanguage("en-US");
    } else {
      i18n.changeLanguage("es-CO");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          backgroundColor: "#9288F9",
          marginTop: -50,
          zIndex: 10,
        }}
      >
        <ImageBackground
          source={{ uri: "https://i.pravatar.cc" }}
          style={{ padding: 20 }}
        >
          <Image
            alt="Not find"
            source={{ uri: "https://i.pravatar.cc" }}
            style={styles.userAvatar}
          />
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              marginBottom: 5,
            }}
          >
            {t("name")}
          </Text>
        </ImageBackground>
        <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: "#ccc",
          // backgroundColor: colors.cardbackground,
        }}
      ></View>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}>
        <Button onPress={handleLanguageChange}>
          <ButtonText>{t("change_language")}</ButtonText>
        </Button>
        <TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="share-social-outline" size={22} />
            <Text
              style={{
                fontSize: 15,

                marginLeft: 5,
              }}
            >
              {t("tell-a-friend")}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 15,

                marginLeft: 5,
              }}
            >
              {t("sign-out")}{" "}
            </Text>
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
    marginBottom: 10,
    marginTop: 30,
  },
  switchTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 7,
    paddingVertical: 5,
  },
  preferences: {
    fontSize: 16,
    color: "#ccc",
    paddingTop: 10,
    fontWeight: "500",
    paddingLeft: 20,
  },
  switchText: {
    fontSize: 17,
    color: "",
    paddingTop: 10,
    fontWeight: "bold",
  },
});
