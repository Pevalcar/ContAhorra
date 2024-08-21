import { HStack } from "../ui/hstack";
import { Text } from "../ui/text";

interface Props {}

export const DataInfo = ({}: Props) => {
  return (
    <HStack className="justify-between">
      <Text>date</Text>
      <Text>date Hour</Text>
      {/* TODO implementar modificador de time */}
    </HStack>
  );
};
