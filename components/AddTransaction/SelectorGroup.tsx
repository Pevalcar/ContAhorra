import { MyIcon } from "../Icons";
import { HStack } from "../ui/hstack";
import { Pressable } from "../ui/pressable";
import { Text } from "../ui/text";
import { type MyIconos } from "@/Types/types";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetFlatList,
  ActionsheetItem,
  ActionsheetItemText,
} from "@/components/ui/actionsheet";
import { useTransactionToAdd } from "@/lib/Hooks/useTransactionToAdd";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {}
export const SelectorGroup: React.FC<Props> = () => {
  const { t } = useTranslation();

  const {
    cuentaSelect,
    categoriSelect,
    cuentasData,
    categoriasData,
    onCategoriaChange,
    onCuentaChange,
  } = useTransactionToAdd();

  return (
    <HStack space="4xl" className="w-full justify-center">
      <MySelector
        name="Cuenta"
        data={cuentasData}
        selected={cuentaSelect}
        idSelected={onCuentaChange}>
        {t("cuenta")}
      </MySelector>
      <MySelector
        selected={categoriSelect}
        name="Categoria"
        data={categoriasData}
        idSelected={onCategoriaChange}>
        {t("categoria")}
      </MySelector>
    </HStack>
  );
};

interface SelectorProps {
  name: string;
  icons?: MyIconos;
  data?: any[];
  selected?: any;
  idSelected: (id: any) => void;
  children?: React.ReactNode;
}

const MySelector = ({ name, data, idSelected, selected, children }: SelectorProps) => {
  const [showActionsheet, setShowActionsheet] = React.useState(false);
  const handleClose = () => setShowActionsheet(false);

  const Item = React.useCallback(
    ({ title }: { title: any }) => (
      <ActionsheetItem
        onPress={() => {
          idSelected(title);
          handleClose();
        }}>
        <MyIcon name={title.icon} color={"black"} />
        <ActionsheetItemText>{title.id}</ActionsheetItemText>
        <ActionsheetItemText>{title.name}</ActionsheetItemText>
      </ActionsheetItem>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [handleClose],
  );
  return (
    <>
      <Pressable
        className="items-center justify-center overflow-hidden pb-1"
        onPress={() => setShowActionsheet(true)}>
        <Text>{children}</Text>
        <HStack
          space="sm"
          className="w-auto items-center justify-center overflow-clip rounded-md border-2 border-outline-400 p-4">
          <MyIcon name={selected ? selected.icon : "Plus"} color="black" />
          <Text className="overflow-hidden">{selected ? selected.name : "Sin seleccionar"}</Text>
        </HStack>
      </Pressable>
      <Actionsheet isOpen={showActionsheet} onClose={handleClose} snapPoints={[50]}>
        <ActionsheetBackdrop />
        <ActionsheetContent>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <ActionsheetFlatList
            data={data}
            initialNumToRender={9}
            renderItem={({ item }) => <Item title={item} />}
            keyExtractor={(item) => (item as any).id as string}
          />
        </ActionsheetContent>
      </Actionsheet>
    </>
  );
};
