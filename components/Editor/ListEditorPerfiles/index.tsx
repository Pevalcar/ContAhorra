import { Text, View } from "@/components/ui";
import { Perfil } from "@/lib/domain/entities";
import { usePerfilesStore } from "@/lib/store";
import React from "react";

export const ListEditorPerfiles = () => {
  const { perfiles, loagin, fetchPerfiles } = usePerfilesStore((state) => state);

  React.useEffect(() => {
    const fetchData = async () => {
      await fetchPerfiles();
    };
    fetchData();
  }, []);
  return (
    <View>
      {loagin ? <Text>Cargando perfiles</Text> : null}
      {perfiles.map((c: Perfil) => (
        <Text key={c.id}>{c.name}</Text>
      ))}
    </View>
  );
};
