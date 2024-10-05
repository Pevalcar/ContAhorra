import {
  DATABASE_VERSION,
  DEVELOPMENT,
  LOCAL_DB_CATEGORIAS_NAME,
  LOCAL_DB_CUENTAS_NAME,
  LOCAL_DB_PROFILES_NAME,
  LOCAL_DB_TRANSACCIONES_NAME,
} from "@/lib/configs/config";
import { DB_Categorias, DB_Cuentas, DB_Transacciones } from "@/lib/db/local/db_local";
import { SQLiteControlError } from "@/lib/domain/error/SqlControlError";
import { SQLiteDatabase } from "expo-sqlite";

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  DEVELOPMENT && (await developmentMigrateDbIfNeeded(db));
  const result = await db.getFirstAsync<{ user_version: number }>("PRAGMA user_version");
  let { user_version: currentDbVersion } = result ?? {};
  if (currentDbVersion === undefined) {
    return;
  }
  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }
  if (currentDbVersion === 0) {
    try {
      await migrateDbToVersion0(db);
      currentDbVersion = 1;
    } catch (error) {
      throw SQLiteControlError.getError(error);
    }
  }
}

async function migrateDbToVersion0(db: SQLiteDatabase) {
  await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      CREATE TABLE IF NOT EXISTS ${LOCAL_DB_CATEGORIAS_NAME} (
      id TEXT PRIMARY KEY NOT NULL UNIQUE ,
      name TEXT NOT NULL,
      icon TEXT NOT NULL,
      type TEXT NOT NULL CHECK( type IN ('Gasto','Ingreso' ,'Transferencia') ),
      uptodataBase BOOLEAN DEFAULT 0,
      userOwnerID TEXT
      );`);

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
      );`);

  await db.execAsync(`  
      CREATE TABLE IF NOT EXISTS ${LOCAL_DB_TRANSACCIONES_NAME} (
      id TEXT PRIMARY KEY NOT NULL UNIQUE ,
      title TEXT NOT NULL,
      balance REAL NOT NULL,
      type TEXT NOT NULL CHECK( type IN ('Gasto','Ingreso' ,'Transferencia') ),
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
      FOREIGN KEY(accountID) REFERENCES ${LOCAL_DB_CUENTAS_NAME}(id) ON DELETE CASCADE);`); //    userOwnerID TEXT,
  await db.withTransactionAsync(async () => {
    const InsertCategories = `INSERT OR REPLACE INTO ${LOCAL_DB_CATEGORIAS_NAME} ( id, name, icon, type, uptodataBase, userOwnerID) VALUES (?, ?, ?, ?, ?, ?);`;
    for (const category of DB_Categorias) {
      await db.runAsync(InsertCategories, [
        category.id,
        category.name,
        category.icon,
        category.type,
        category.uptodataBase,
        category.userOwnerID,
      ]);
    }

    const InsertAccounts = `INSERT OR REPLACE INTO ${LOCAL_DB_CUENTAS_NAME} (id, name, icon, uptodataBase, userOwnerID) VALUES (?, ?, ?, ?, ?);`;
    for (const account of DB_Cuentas) {
      await db.runAsync(InsertAccounts, [
        account.id,
        account.name,
        account.icon,
        account.uptodataBase,
        account.userOwnerID,
      ]);
    }
    if (DEVELOPMENT) {
      const InsertTransacciones = `INSERT OR REPLACE INTO ${LOCAL_DB_TRANSACCIONES_NAME} (id, title, balance, type, date, description, categoryID, accountID, userOwnerID, prestadoaID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
      await db.withExclusiveTransactionAsync(async () => {
        for (const account of DB_Transacciones) {
          await db.runAsync(InsertTransacciones, [
            account.id,
            account.title,
            account.balance,
            account.type,
            account.date,
            account.description,
            account.categoryID,
            account.accountID,
            account.userOwnerID,
            account.prestadoaID,
          ]);
        }
      });
    }
  });

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
