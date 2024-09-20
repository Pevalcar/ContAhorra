import { Screen } from "@/components/Screen";
import { Button, ButtonText } from "@/components/ui/button";
import { useSession } from "@/lib/sesionprovider/ctx";
import React from "react";
import { Text, View } from "react-native";

export default function Login() {
  const { signIn, error } = useSession();
  const [loagin, setLoagin] = React.useState(false);

  React.useEffect(() => {
    if (error) {
      setLoagin(false);
    }
  }, [error]);

  return (
    <Screen>
      <View>
        <Text> {loagin ? "Cargando ..." : "Login"}</Text>
        <Text>{error ? error : ""}</Text>
        <Button
          onPress={() => {
            setLoagin(true);
            signIn();
          }}>
          <ButtonText>Login</ButtonText>
        </Button>
      </View>
    </Screen>
  );
}
