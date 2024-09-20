import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import React from "react";

interface Props {}

export const DataInfo: React.FC<Props> = () => {
  return (
    <HStack className="justify-between">
      <Text>date</Text>
      <Text>date Hour web</Text>
      {/* TODO implementar modificador de time para web */}
    </HStack>
  );
};
