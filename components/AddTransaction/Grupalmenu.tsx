import { TiposDeTransacciones } from "@/Types/types";
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  Text,
} from "@/components/ui";
import { useTransactionToADDState } from "@/lib/store";
import { router } from "expo-router";
import { t } from "i18next";
import { CheckCircle, FilterIcon } from "lucide-react-native";
import React from "react";
import { View } from "react-native";

interface Props {}

export const Grupalmenu: React.FC<Props> = () => {
  const { categoriSelect, setPrestado, perfilesData, loagin, prestado, fetchPerfilesData } =
    useTransactionToADDState((state) => state);

  React.useEffect(() => {
    const fetchData = async () => {
      await fetchPerfilesData(); //TODO comprobar que al regresar de agregar se actualizen los perfiles
    };
    fetchData();
  }, []);
  return (
    <View className="h-8 w-full flex-row items-center justify-between">
      {categoriSelect?.prestamo && (
        <>
          <Text>Prestando a</Text>
          <Select
            onValueChange={(index) => {
              if (index === "agregar_perfil") {
                router.push("/add_perfil");
                return;
              }
              setPrestado(index);
            }}
            defaultValue={prestado?.name ?? "Selecciona un perfil"}
            isDisabled={loagin}
            className="flex-row flex-wrap items-end justify-end gap-2">
            <SelectTrigger>
              <SelectIcon as={FilterIcon} className="mr-3" />
              <SelectInput />
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                {perfilesData.map((perfil) => {
                  return <SelectItem label={perfil.name} value={perfil.id} key={perfil.id} />;
                })}
                <SelectItem label="Agregar Perfil" value="agregar_perfil" />
              </SelectContent>
            </SelectPortal>
          </Select>
        </>
      )}
    </View>
  );
};
