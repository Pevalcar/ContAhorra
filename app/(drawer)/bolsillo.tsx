import { TransactionTotal } from "@/Types/types";
import { TextCurrency } from "@/components/TextCurrency";
import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";
import { SegmentControl } from "@/components/ui/segmentcontrol";
import { VStack } from "@/components/ui/vstack";
import {
  getAllAccount,
  getAllCategory,
  getAllTransaccion,
  getTotalTransactionByDateRange,
} from "@/lib/core/di/Container";
import { Categoria, Cuenta, Transaccion } from "@/lib/domain/entities";
import { useTransaccionesStore } from "@/lib/store";
import * as Crypto from "expo-crypto";
import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Bolsillo() {
  return <Pruebas />;
}

//TODO https://github.com/betomoedano/Budget-Buddy-App/tree/main
function Pruebas() {
  return (
    <View style={styles.container}>
      <SegmentControl
        values={["a", "b", "c", "pene"]}
        className="flex-row gap-2"
        selectedIndex={0}
        onChange={() => {}}
      />
      <Header />
      <Content />
    </View>
  );
}

export function Header() {
  const db = useSQLiteContext();
  const [version, setVersion] = useState<string | null>("");
  useEffect(() => {
    async function setup() {
      const result = await db.getFirstAsync<{ "sqlite_version()": string }>(
        "SELECT sqlite_version()",
      );
      if (!result) return;
      setVersion(result["sqlite_version()"]);
    }
    setup();
  }, []);
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>SQLite version: {version}</Text>
    </View>
  );
}

export function Content() {
  const db = useSQLiteContext();
  const [todos, setTodos] = useState<Transaccion[]>([]);
  const [category, setCategory] = useState<Categoria[]>([]);
  const [account, setAccount] = useState<Cuenta[]>([]);
  const { addTransaccion, deleteTransaccion } = useTransaccionesStore((state) => state);
  const [transactionsByMonth, setTransactionsByMonth] = React.useState<TransactionTotal>({
    totalExpenses: 0,
    totalIncome: 0,
    totalTransfer: 0,
  });

  async function getData() {
    const result = await getAllTransaccion.execute();
    setTodos(result);

    const resultCategory = await getAllCategory.execute();
    setCategory(resultCategory);

    const resultAccount = await getAllAccount.execute("3");
    setAccount(resultAccount);
    const newDate = new Date();
    const startOfMonth = new Date(newDate.getFullYear(), newDate.getMonth(), 1);
    const endOfMonth = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 1);

    endOfMonth.setMilliseconds(endOfMonth.getMilliseconds() - 1);

    const startOfMonthTimestamp = Math.floor(startOfMonth.getTime() / 1000);
    const endOfMonthTimestamp = Math.floor(endOfMonth.getTime() / 1000);
    const transactionsByMonth = await getTotalTransactionByDateRange.execute({
      startDate: startOfMonthTimestamp,
      endDate: endOfMonthTimestamp,
      type: "Ingreso",
    });

    setTransactionsByMonth(transactionsByMonth);
  }

  useEffect(() => {
    db.withTransactionAsync(async () => {
      await getData();
    });
  }, [db]);

  const addTodo = async () => {
    const UUID = Crypto.randomUUID();
    const date = new Date();
    const dateTimestamp = Math.floor(date.getTime() / 1000);
    const transaction = new Transaccion({
      id: UUID,
      balance: 6000,
      type: "Ingreso",
      date: dateTimestamp,
      description: "hello",
      categoryID: "1",
      accountID: "2",
    });
    await db.withTransactionAsync(async () => {
      await addTransaccion(transaction);
      await getData();
    });
  };

  const deleteTodo = async (id: string) => {
    await db.withTransactionAsync(async () => {
      await deleteTransaccion(id);
      await getData();
    });
  };
  return (
    <View style={styles.contentContainer}>
      <Button
        onPress={async () => {
          await addTodo();
        }}>
        <ButtonText> add todo </ButtonText>
      </Button>
      <Heading> Categorias </Heading>
      {category.map((item, index) => (
        <Text key={"categoria" + index}>{`${item.id} - ${item.name} - ${item.icon}`}</Text>
      ))}
      <Heading> Cuentas </Heading>
      {account.map((item, index) => (
        <Text key={index + "textCuenta"}>{`${item.id} - ${item.name} - ${item.icon}`}</Text>
      ))}
      {
        <Text>{` Total de ${transactionsByMonth.totalExpenses} gastos y ${transactionsByMonth.totalIncome} ingresos`}</Text>
      }

      <ScrollView>
        {todos.map((item, index) => (
          <Card
            size="sm"
            variant="outline"
            className="mb-4 flex-row items-center justify-between"
            key={index + "transaccions"}>
            <Avatar size="md">
              <AvatarFallbackText className="text-white">{item.type}</AvatarFallbackText>
            </Avatar>
            <VStack className="ml-4 flex-1">
              <Heading size="sm">{item.description}</Heading>
              <Text className="text-typography-500">{item.description}</Text>
              <Text className="text-typography-500">{item.type}</Text>
              <Text className="text-typography-500">
                {new Date(item.date).toLocaleDateString()}
              </Text>
            </VStack>
            <TextCurrency sign negative={item.type === "Gasto"} size="sm" value={item.balance} />

            <Pressable className="mr-4" onPress={() => deleteTodo(item.id)}>
              <Text>Delete</Text>
            </Pressable>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}

// async function migrateDbToVersion2(db: SQLiteDatabase) {
//   await db.execAsync(`
//             CREATE TABLE IF NOT EXISTS ${LOCAL_DB_PROFILES_NAME} (
//                 id TEXT PRIMARY KEY NOT NULL UNIQUE ,
//                 name TEXT NOT NULL,
//                 photoURL TEXT NOT NULL,
//                 userOwnerID TEXT
//             );
//         `);
//   // Añadir columna 'uptodataBase' a la tabla 'categories'
//   await db.execAsync(`ALTER TABLE categories ADD COLUMN uptodataBase BOOLEAN DEFAULT 0;`);
//   // Añadir columna 'userOwnerID' a la tabla 'categories'
//   await db.execAsync(`ALTER TABLE categories ADD COLUMN userOwnerID TEXT;`);
//   // Añadir columna 'userOwnerID' a la tabla 'accounts'
//   await db.execAsync(`ALTER TABLE accounts ADD COLUMN userOwnerID TEXT;`);
//   // Añadir columna 'userOwnerID' a la tabla 'transacciones'
//   await db.execAsync(`ALTER TABLE transacciones ADD COLUMN userOwnerID TEXT;`);
//   // Añadir columna 'prestadoaID' a la tabla 'transacciones'
//   await db.execAsync(`ALTER TABLE transacciones ADD COLUMN prestadoaID TEXT;`);
//   // Añadir columna 'userOwnerID' a la tabla 'accounts'
//   await db.execAsync(`ALTER TABLE accounts ADD COLUMN userOwnerID TEXT;`);
//   await db.execAsync(`ALTER TABLE transacciones ADD COLUMN uptodataBase BOOLEAN DEFAULT 0;`);
//   await db.execAsync(`ALTER TABLE accounts ADD COLUMN uptodataBase BOOLEAN DEFAULT 0;`);
//   await db.execAsync(
//     `ALTER TABLE transacciones ADD FOREIGN KEY(prestadoaID) REFERENCES ${LOCAL_DB_PROFILES_NAME}(id) ON DELETE CASCADE;`,
//   );

//   await db.execAsync(
//     `ALTER TABLE transacciones ADD FOREIGN KEY(category_id) REFERENCES ${LOCAL_DB_CATEGORIAS_NAME}(id) ON DELETE CASCADE;`,
//   );

//   await db.execAsync(
//     `ALTER TABLE transacciones ADD FOREIGN KEY(account_id) REFERENCES ${LOCAL_DB_CUENTAS_NAME}(id) ON DELETE CASCADE;`,
// //   );

//   await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    padding: 16,
    backgroundColor: "#eee",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  contentContainer: {
    width: "100%",
    height: "100%",
  },
  todoItemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
