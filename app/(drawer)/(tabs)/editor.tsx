import EditorList from "@/components/Editor/EditorList";
import { Screen } from "@/components/Screen";
import {
  Box,
  HStack,
  Heading,
  SegmentControl,
  Skeleton,
  SkeletonText,
  VStack,
} from "@/components/ui";
import { Categoria, Cuenta, Perfil } from "@/lib/domain/entities";
import { useCategoriaStore, useCuentasStore, usePerfilesStore } from "@/lib/store";
import React from "react";
import { ScrollView, Text, View } from "react-native";

export default function editor() {
  const { fetchCuentas, loagin: cuentasLoagin } = useCuentasStore((state) => state);
  const { fetchPerfiles, loagin: perfilesLoagin } = usePerfilesStore((state) => state);
  const { initialFetch, loagin: categoriasLoagin } = useCategoriaStore((state) => state);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  React.useEffect(() => {
    const fetchData = async () => {
      await fetchCuentas();
      await initialFetch();
      await fetchPerfiles();
    };
    fetchData();
  }, []);
  return (
    <Screen isLoading={cuentasLoagin || perfilesLoagin || categoriasLoagin}>
      <VStack space="md">
        <SegmentControl
          className="h-auto flex-row rounded-md bg-background-300"
          values={["Categorias", "Perfiles", "Cuentas"]}
          selectedIndex={0}
          onChange={(e) => setSelectedIndex(e)}
        />
        <EditorList selectedIndex={selectedIndex} />
      </VStack>
    </Screen>
  );
}
