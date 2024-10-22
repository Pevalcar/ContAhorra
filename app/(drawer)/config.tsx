import { DarkModeButon } from "@/components/DarkModeButon";
import SummaryChart from "@/components/SummarryChart";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useTranslation } from "react-i18next";

export default function Config() {
  const { t } = useTranslation();

  return (
    <VStack space="lg">
      <Text>{t("config")}</Text>
      <HStack space="sm">
        <Text>{t("modo-oscuro")}</Text>
        <DarkModeButon />
      </HStack>
      <SummaryChart />
    </VStack>
  );
}
