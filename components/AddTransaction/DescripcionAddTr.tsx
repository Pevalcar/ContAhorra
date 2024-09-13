import { Input, InputField } from "../ui/input";
import { Text } from "../ui/text";
import { useTransactionToAdd } from "@/lib/Hooks/useTransactionToAdd";
import React from "react";

interface Props {}

export const DescripcionAddTr: React.FC<Props> = () => {
  const { description: text, onDescriptionChange: setText } =
    useTransactionToAdd();

  return (
    <Input className="my-2 w-full sm:w-[400px] h-[80px] text-sta">
      <InputField
        className="w-full h-full"
        placeholder="Description"
        value={text}
        multiline
        onChange={(e) => setText(e.nativeEvent.text)}
      />
    </Input>
  );
};
