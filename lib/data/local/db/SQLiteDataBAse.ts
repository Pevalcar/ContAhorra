import {
  DATABASE_VERSION,
  DEVELOPMENT,
  LOCAL_DB_CATEGORIAS_NAME,
  LOCAL_DB_CUENTAS_NAME,
  LOCAL_DB_PROFILES_NAME,
  LOCAL_DB_TRANSACCIONES_NAME,
} from "@/lib/configs/config";
import { SQLiteDatabase } from "expo-sqlite";

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  DEVELOPMENT && (await developmentMigrateDbIfNeeded(db));
  const result = await db.getFirstAsync<{ user_version: number }>("PRAGMA user_version");
  console.log("result de migracion", result);

  let { user_version: currentDbVersion } = result ?? {};
  if (currentDbVersion === undefined) {
    return;
  }
  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }
  if (currentDbVersion === 0) {
    console.log("iniciando migracion");
    await db.execAsync(`
    PRAGMA journal_mode = 'wal';
    CREATE TABLE IF NOT EXISTS ${LOCAL_DB_CATEGORIAS_NAME} (
    id TEXT PRIMARY KEY NOT NULL UNIQUE ,
    name TEXT NOT NULL,
    icon TEXT NOT NULL,
    uptodataBase BOOLEAN DEFAULT 0,
    userOwnerID TEXT
);
    `);
    await db.execAsync(`
    CREATE TABLE IF NOT EXISTS ${LOCAL_DB_CUENTAS_NAME} (
    id TEXT PRIMARY KEY NOT NULL UNIQUE,
    name TEXT NOT NULL,
    icon TEXT NOT NULL,
    uptodataBase BOOLEAN DEFAULT 0,
    userOwnerID TEXT
);`);
    await db.execAsync(`
         CREATE TABLE IF NOT EXISTS ${LOCAL_DB_PROFILES_NAME} (
        id TEXT PRIMARY KEY NOT NULL UNIQUE ,
        name TEXT NOT NULL,
        photoURL TEXT NOT NULL,
        userReferredID TEXT,
        uptodataBase BOOLEAN DEFAULT 0,
        userOwnerID TEXT
        emojis TEXT
        );
        `);

    await db.execAsync(`  
    CREATE TABLE IF NOT EXISTS ${LOCAL_DB_TRANSACCIONES_NAME} (
    id TEXT PRIMARY KEY NOT NULL UNIQUE ,
    title TEXT NOT NULL,
    balance REAL NOT NULL,
    type TEXT NOT NULL CHECK( type IN ('Gasto', 'Transferencia', 'Préstamo', 'Ingreso', 'Saldo') ),
    date INTEGER NOT NULL,
    description TEXT NOT NULL,
    categoryID TEXT NOT NULL,
    accountID TEXT NOT NULL,
    uptodataBase BOOLEAN DEFAULT 0,
    prestadoaName TEXT,
    prestadoaID TEXT,
    userOwnerID TEXT,
    FOREIGN KEY(prestadoaID) REFERENCES ${LOCAL_DB_PROFILES_NAME}(id) ON DELETE SET NULL,
    FOREIGN KEY(categoryID) REFERENCES ${LOCAL_DB_CATEGORIAS_NAME}(id) ON DELETE CASCADE,
    FOREIGN KEY(accountID) REFERENCES ${LOCAL_DB_CUENTAS_NAME}(id) ON DELETE CASCADE
);
`); //    userOwnerID TEXT,

    await db.withTransactionAsync(async () => {
      console.log("iniciando insertado de datos");
      const InsertCategories = `INSERT OR REPLACE INTO ${LOCAL_DB_CATEGORIAS_NAME} (id, name, icon) VALUES (?, ?, ?);`;
      await db.runAsync(InsertCategories, "1", "Alimentos", "Shoping");
      await db.runAsync(InsertCategories, "2", "Ingresos", "Plus");
      await db.runAsync(InsertCategories, "3", "Vivienda", "Home");
      await db.runAsync(InsertCategories, "4", "Transferencias", "SwitchCamera");
      await db.runAsync(InsertCategories, "5", "Ropa", "Shoping");
      await db.runAsync(InsertCategories, "6", "Reembolsos", "ClipboardList");
      await db.runAsync(InsertCategories, "7", "Entretenimiento", "Disc");
      await db.runAsync(InsertCategories, "8", "Préstamos", "FileEdit");

      const InsertAccounts = `INSERT OR REPLACE INTO ${LOCAL_DB_CUENTAS_NAME} (id, name, icon) VALUES (?, ?, ?);`;
      await db.runAsync(InsertAccounts, "1", "Cuenta Bancaria", "Wallet");
      await db.runAsync(InsertAccounts, "2", "Cuenta de Ahorros", "PiggyBank");
    });
    currentDbVersion = 1;
  }
  // if (currentDbVersion === 1) {
  //   await migrateDbToVersion2(db);
  //   currentDbVersion = 2;
  // }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

async function developmentMigrateDbIfNeeded(db: SQLiteDatabase) {
  await db.execAsync(`PRAGMA user_version = ${0}`);
  await db.execAsync(`DROP TABLE IF EXISTS ${LOCAL_DB_CATEGORIAS_NAME}`);
  await db.execAsync(`DROP TABLE IF EXISTS ${LOCAL_DB_CUENTAS_NAME}`);
  await db.execAsync(`DROP TABLE IF EXISTS ${LOCAL_DB_TRANSACCIONES_NAME}`);
  await db.execAsync(`DROP TABLE IF EXISTS ${LOCAL_DB_PROFILES_NAME}`);
}
