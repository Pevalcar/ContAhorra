import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

export default function Reportes() {
  const { t } = useTranslation();
  return (
    <View>
      <Text>{t("reports")}</Text>
    </View>
  );
}
