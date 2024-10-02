import { type SQLiteDatabase, SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Bolsillo() {
  return <Pruebas />;
}

function Pruebas() {
  return (
    <View style={styles.container}>
      <SQLiteProvider databaseName="test.db" onInit={migrateDbIfNeeded}>
        <Header />
        <Content />
      </SQLiteProvider>
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

interface Todo {
  value: string;
  intValue: number;
}

export function Content() {
  const db = useSQLiteContext();
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    async function setup() {
      const result = await db.getAllAsync<Todo>("SELECT * FROM todos");
      setTodos(result);
    }
    setup();
  }, []);

  return (
    <View style={styles.contentContainer}>
      {todos.map((todo, index) => (
        <View style={styles.todoItemContainer} key={index}>
          <Text>{`${todo.intValue} - ${todo.value}`}</Text>
        </View>
      ))}
    </View>
  );
}

async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 1;
  const result = await db.getFirstAsync<{ user_version: number }>("PRAGMA user_version");

  let { user_version: currentDbVersion } = result ?? {};
  if (currentDbVersion === undefined) {
    return;
  }
  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }
  console.log(" result", result);

  if (currentDbVersion === 0) {
    await db.execAsync(`
PRAGMA journal_mode = 'wal';
CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL, intValue INTEGER);
`);
    await db.runAsync("INSERT INTO todos (value, intValue) VALUES (?, ?)", "hello", 1);
    await db.runAsync("INSERT INTO todos (value, intValue) VALUES (?, ?)", "world", 2);
    await db.runAsync("INSERT INTO todos (value, intValue) VALUES (?, ?)", "world2", 3);
    await db.runAsync("INSERT INTO todos (value, intValue) VALUES (?, ?)", "world3", 4);
    await db.runAsync("INSERT INTO todos (value, intValue) VALUES (?, ?)", "world4", 5);
    await db.runAsync("INSERT INTO todos (value, intValue) VALUES (?, ?)", "world4", 6);
    await db.runAsync("INSERT INTO todos (value, intValue) VALUES (?, ?)", "world4", 7);
    currentDbVersion = 1;
  }
  // if (currentDbVersion === 1) {
  //   Add more migrations
  // }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

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
    padding: 16,
  },
  todoItemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
