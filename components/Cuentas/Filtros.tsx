import { Button, ButtonText } from "../ui/button";
import { HStack } from "../ui/hstack";
import { TiposDeTransacciones } from "@/Types/types";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  setFliter: React.Dispatch<React.SetStateAction<TiposDeTransacciones | null>>;
}

export const Filtros: React.FC<Props> = ({ setFliter }) => {
  const [select, setSelect] = useState(3);
  const { t } = useTranslation();
  function handleClick(position: number) {
    switch (position) {
      case 0:
        setFliter("Gasto");
        break;
      case 1:
        setFliter("Ingreso");
        break;
      case 2:
        setFliter("Transferencia");
        break;
      case 3:
        setFliter(null);
        break;
      case 4:
        setFliter("Préstamo");
        break;
      default:
        break;
    }
    setSelect(position);
  }

  return (
    <HStack space="xs" className="mt-4 flex-wrap">
      <MyButton bgColor="bg-blue-500 " isActive={select === 3} onPress={() => handleClick(3)}>
        {t("FILTROTODO")}
      </MyButton>
      <MyButton bgColor="bg-red-500 " isActive={select === 0} onPress={() => handleClick(0)}>
        {t("HOME.FILTRO.GASTO")}
      </MyButton>
      <MyButton bgColor="bg-green-500 " isActive={select === 1} onPress={() => handleClick(1)}>
        {t("HOME.FILTRO.INGRESO")}
      </MyButton>
      <MyButton bgColor="bg-purple-500 " isActive={select === 4} onPress={() => handleClick(4)}>
        {t("HOME.FILTRO.PRESTAMO")}
      </MyButton>
      <MyButton bgColor="bg-yellow-500 " isActive={select === 2} onPress={() => handleClick(2)}>
        {t("HOME.FILTRO.TRANSFERENCIA")}
      </MyButton>
    </HStack>
  );
};

type ButtonProsps = {
  children: React.ReactNode;
  isActive?: boolean;
  onPress?: () => void;
  bgColor?: string;
};
const MyButton = ({ children, isActive, onPress, bgColor }: ButtonProsps) => {
  return (
    <Button onPress={onPress} variant="outline" className={isActive ? bgColor : ""}>
      <ButtonText>{children}</ButtonText>
    </Button>
  );
};
