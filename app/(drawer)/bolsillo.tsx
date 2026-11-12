import { Heading, Text, VStack } from "@/components/ui";
import React from "react";

export default function Bolsillo() {
  return (
    <VStack className="flex-1 items-center justify-center p-6">
      <Heading size="xl" className="mb-2 text-center">
        Bolsillo
      </Heading>
      <Text className="text-center text-muted-foreground">
        Módulo en desarrollo — próximamente disponible
      </Text>
    </VStack>
  );
}
