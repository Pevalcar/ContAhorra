import { Text, View } from "@/components/ui";
import { Perfil } from "@/lib/domain/entities";
import { usePerfilesStore } from "@/lib/store";

export const ListEditorPerfiles = () => {
  const { perfiles, loagin } = usePerfilesStore((state) => state);
  return (
    <View>
      {perfiles.map((c: Perfil) => (
        <Text key={c.id}>{c.name}</Text>
      ))}
    </View>
  );
};
