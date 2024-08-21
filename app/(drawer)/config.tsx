import { DarkModeButon } from "@/components/DarkModeButon";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

export default function config() {
  return (
    <VStack space="lg">
      <Text>config</Text>
      <HStack space="sm">
        <Text>Modo oscuro</Text>
        <DarkModeButon />
      </HStack>
    </VStack>
  );
}
