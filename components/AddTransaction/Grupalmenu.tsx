import type { MyIconos } from "@/Types/types";
import { CreateProfileModal } from "@/components/CreateProfileModal";
import { MyIcon } from "@/components/Icons";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetFlatList,
  ActionsheetItem,
  ActionsheetItemText,
  Avatar,
  AvatarImage,
  Pressable,
  Text,
} from "@/components/ui";
import { Perfil } from "@/lib/domain/entities";
import { usePerfilesStore, useTransactionToADDState } from "@/lib/store";
import React from "react";
import { View } from "react-native";

interface Props {}

export const Grupalmenu: React.FC<Props> = () => {
  const { categoriSelect, setPrestado, prestado } = useTransactionToADDState((state) => state);
  const { fetchPerfiles, perfiles } = usePerfilesStore((state) => state);

  React.useEffect(() => {
    const fetchData = async () => {
      await fetchPerfiles(); //TODO comprobar que al regresar de agregar se actualizen los perfiles
    };
    fetchData();
  }, []);
  return (
    <View className="h-10 w-full flex-row items-center justify-between">
      {categoriSelect?.prestamo && (
        <>
          <Text>Prestando a</Text>
          <MySelector idSelected={setPrestado} selected={prestado} name="Perfil" data={perfiles} />
        </>
      )}
    </View>
  );
};

interface SelectorProps {
  name: string;
  icons?: MyIconos;
  data?: Perfil[];
  selected?: Perfil | null;
  idSelected: (id: string) => void;
}
const MySelector = React.memo(function MySelector({
  name,
  data,
  idSelected,
  selected,
}: SelectorProps) {
  const [showActionsheet, setShowActionsheet] = React.useState(false);
  const handleClose = () => setShowActionsheet(false);
  const [showModal, setShowModal] = React.useState(false);
  const ref = React.useRef(null);

  return (
    <>
      <CreateProfileModal showModal={showModal} setShowModal={setShowModal} ref={ref} />
      <Pressable
        className="flex-row items-center justify-center gap-2 overflow-hidden rounded-lg border-2 border-outline-400 px-3 py-1"
        onPress={() => setShowActionsheet(true)}>
        {selected?.avatar_url && (
          <Avatar size="sm">
            <AvatarImage source={{ uri: selected?.avatar_url }} />
          </Avatar>
        )}
        <Text className="overflow-hidden">{selected ? selected.name : "Sin seleccionar"}</Text>
      </Pressable>
      <Actionsheet isOpen={showActionsheet} onClose={handleClose} snapPoints={[50]}>
        <ActionsheetBackdrop />
        <ActionsheetContent>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <ActionsheetItem
            className="flex-row items-center justify-center gap-2 overflow-hidden pb-1"
            onPress={() => {
              handleClose();
              setShowModal(true);
            }}>
            <MyIcon name="Plus" color={"black"} />
            <ActionsheetItemText>Agregar Perfil</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetFlatList
            data={data}
            initialNumToRender={9}
            renderItem={({ item }: { item: Perfil | any }) => (
              <Item
                title={item}
                key={item?.id}
                handleClose={() => {
                  idSelected(item?.id as string);
                  handleClose();
                }}
              />
            )}
            keyExtractor={(item) => (item as any).id as string}
          />
        </ActionsheetContent>
      </Actionsheet>
    </>
  );
});

const Item = React.memo(function Item({
  title,
  handleClose,
  ...props
}: {
  title: Perfil | any;
  handleClose: () => void;
}) {
  return (
    <ActionsheetItem
      onPress={() => {
        handleClose();
      }}
      {...props}>
      <ActionsheetItemText>
        <Avatar size="sm">
          <AvatarImage source={{ uri: title?.avatar_url }} />
        </Avatar>
      </ActionsheetItemText>
      <ActionsheetItemText>{title.name}</ActionsheetItemText>
    </ActionsheetItem>
  );
});
