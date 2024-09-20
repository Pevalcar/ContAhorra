import { Input, InputField } from "../ui/input";
import { useTransactionToAdd } from "@/lib/Hooks/useTransactionToAdd";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {}

export const DescripcionAddTr: React.FC<Props> = () => {
  const { description: text, onDescriptionChange: setText } = useTransactionToAdd();
  const { t } = useTranslation();
  return (
    <Input className="text-sta my-2 h-[80px] w-full sm:w-[400px]">
      <InputField
        className="h-full w-full"
        placeholder={t("description")}
        value={text}
        multiline
        onChange={(e) => setText(e.nativeEvent.text)}
      />
    </Input>
  );
};
