import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

export default function Bolsillo() {
  const { t } = useTranslation();
  return (
    <View>
      <Text>{t("pocket")}</Text>
    </View>
  );
}
