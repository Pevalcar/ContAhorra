import { Screen } from "@/components/Screen";
import { Input, InputField, VStack } from "@/components/ui";
import React from "react";
import { Text } from "react-native";

export default function Add_perfil() {
  const [nombre, setNombre] = React.useState<string>("");
  const [emojis, setEmojis] = React.useState<string>("");

  return (
    <Screen>
      <VStack>
        <Text>add_perfil</Text>
        <Text>{emojis}</Text>
        <Input className="mb-4">
          <InputField
            placeholder="agrega un emojis"
            onChangeText={(text) => setEmojis(text)}
            maxLength={5}
          />
        </Input>
        <Input className="mb-4">
          <InputField
            placeholder="agrega un emojis"
            onChangeText={(text) => setNombre(text)}
            maxLength={5}
          />
        </Input>
      </VStack>
    </Screen>
  );
}
