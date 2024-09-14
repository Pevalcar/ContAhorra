import { Input, InputField } from "../ui/input";
import { Text } from "../ui/text";
import { useTransactionToAdd } from "@/lib/Hooks/useTransactionToAdd";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {}

export const DescripcionAddTr: React.FC<Props> = () => {
  const { description: text, onDescriptionChange: setText } =
    useTransactionToAdd();
  const { t } = useTranslation();
  return (
    <Input className="my-2 w-full sm:w-[400px] h-[80px] text-sta">
      <InputField
        className="w-full h-full"
        placeholder={t("description")}
        value={text}
        multiline
        onChange={(e) => setText(e.nativeEvent.text)}
      />
    </Input>
  );
};
