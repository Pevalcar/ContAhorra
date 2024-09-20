import { Filtros } from "@/components/Cuentas/Filtros";
import { ListTransacciones } from "@/components/Cuentas/ListTransacciones";
import { SaldoHeading } from "@/components/Cuentas/SaldoHeading";
import { Screen } from "@/components/Screen";
import { Button, ButtonText } from "@/components/ui/button";
import { Fab, FabIcon } from "@/components/ui/fab";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { auth } from "@/firebaseConfig";
import { useFilterTrasaction } from "@/lib/Hooks/useFilterTrasaction";
import { useMyToast } from "@/lib/Hooks/useToast";
import { router } from "expo-router";
import { User, signInWithEmailAndPassword } from "firebase/auth";
import { PlusIcon } from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";

export default function Index() {
  const { filter, setSearch } = useFilterTrasaction();
  const { t } = useTranslation();
  const [user, setUser] = React.useState<User | null>(null);
  const { handleToast } = useMyToast();

  React.useEffect(() => {
    if (auth.currentUser) {
      setUser(user);
      handleToast("Login", "Login correcto", "info");
    }
  }, []);

  function login() {
    signInWithEmailAndPassword(auth, "tests@test.com", "1234568")
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }

  function logout() {
    auth.signOut();
    setUser(null);
    handleToast("Logout", "Logout correcto", "success");
  }
  return (
    <Screen>
      <Button onPress={login}>
        <ButtonText>{user ? JSON.stringify(user?.email) : "Login"}</ButtonText>
      </Button>
      <Button onPress={logout}>
        <ButtonText>{"Logout"}</ButtonText>
      </Button>
      <VStack className="flex-1">
        <SaldoHeading />
        <Filtros setFliter={setSearch} />
        <Heading size="lg" className="my-4">
          {t("home.history")}
        </Heading>
        <ListTransacciones list={filter} />
        <Fab
          size={"lg"}
          placement="bottom right"
          className="bg-green-500"
          onPress={() => {
            router.push("/add_tansaction");
          }}>
          <FabIcon as={PlusIcon} stroke="white" size="xl" />
        </Fab>
      </VStack>
    </Screen>
  );
}
