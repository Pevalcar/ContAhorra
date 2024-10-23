import {
  DATABASE_VERSION,
  DEVELOPMENT,
  LOCAL_DB_CATEGORIAS_NAME,
  LOCAL_DB_CUENTAS_NAME,
  LOCAL_DB_GRUPS_NAME,
  LOCAL_DB_PROFILES_NAME,
  LOCAL_DB_TRANSACCIONES_NAME,
} from "@/lib/configs/config";
import {
  DB_Categorias,
  DB_Cuentas,
  DB_Groups,
  DB_PERFILES,
  DB_Transacciones,
} from "@/lib/db/local/db_local";
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
  const DEbug = DEVELOPMENT ? true : false;

  DEbug && console.log("iunsentando tabla cateroria");
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;
    CREATE TABLE IF NOT EXISTS ${LOCAL_DB_CATEGORIAS_NAME} (
    id TEXT PRIMARY KEY NOT NULL UNIQUE ,
    name TEXT NOT NULL,
    icon TEXT NOT NULL,
    type TEXT NOT NULL CHECK( type IN ('Gasto','Ingreso' ,'Transferencia') ),
    prestamo BOOLEAN DEFAULT 0,
    uptodataBase BOOLEAN DEFAULT 0,
    userOwnerID TEXT,
    color TEXT NULL
    );`);
  DEbug && console.log("iunsentando tabla cuenta");
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS ${LOCAL_DB_CUENTAS_NAME} (
    id TEXT PRIMARY KEY NOT NULL UNIQUE,
    name TEXT NOT NULL,
    icon TEXT NOT NULL,
    uptodataBase BOOLEAN DEFAULT 0,
    grupal BOOLEAN DEFAULT 0,
    userOwnerID TEXT,
    color TEXT NULL
    );`);
  DEbug && console.log("iunsentando tabla perfiles");
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS ${LOCAL_DB_PROFILES_NAME} (
    id TEXT PRIMARY KEY NOT NULL UNIQUE ,
    name TEXT NOT NULL,
    avatar_url TEXT,
    userReferredID TEXT,
    uptodataBase BOOLEAN DEFAULT 0,
    userOwnerID TEXT,
    color TEXT NULL
    );`);
  DEbug && console.log("iunsentando tabla grupos");
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS ${LOCAL_DB_GRUPS_NAME} (
    id TEXT PRIMARY KEY NOT NULL UNIQUE ,
    name TEXT NOT NULL,
    icon TEXT NOT NULL,
    userOwnerID TEXT,
    uptodataBase BOOLEAN DEFAULT 0,
    usersIdInGroup TEXT,
    color TEXT NULL
    );`);
  DEbug && console.log("iunsentando tabla transacciones");
  await db.execAsync(`  
    CREATE TABLE IF NOT EXISTS ${LOCAL_DB_TRANSACCIONES_NAME} (
    id TEXT PRIMARY KEY NOT NULL UNIQUE ,
    balance REAL NOT NULL,
    type TEXT NOT NULL CHECK( type IN ('Gasto','Ingreso' ,'Transferencia') ),
    date INTEGER NOT NULL,
    description TEXT NOT NULL,
    categoryID TEXT NOT NULL,
    accountID TEXT NOT NULL,
    uptodataBase BOOLEAN DEFAULT 0,
    pago BOOLEAN DEFAULT 0,
    prestadoaName TEXT,
    prestadoaID TEXT,
    userOwnerID TEXT,
    FOREIGN KEY(categoryID) REFERENCES ${LOCAL_DB_CATEGORIAS_NAME}(id) ON DELETE CASCADE,
    FOREIGN KEY(accountID) REFERENCES ${LOCAL_DB_CUENTAS_NAME}(id) ON DELETE CASCADE);`); //    userOwnerID TEXT,
  await db.withTransactionAsync(async () => {
    DEbug && console.log("iunsentando datos cateroria");
    const InsertCategories = `INSERT OR REPLACE INTO ${LOCAL_DB_CATEGORIAS_NAME} ( id, name, icon, type, uptodataBase, userOwnerID , prestamo, color) VALUES (?, ?, ?, ?, ?, ?, ? , ?);`;
    for (const category of DB_Categorias) {
      await db.runAsync(InsertCategories, [
        category.id,
        category.name,
        category.icon,
        category.type,
        category.uptodataBase ? 1 : 0,
        category.userOwnerID,
        category.prestamo,
        category.color,
      ]);
    }
    DEbug && console.log("iunsentando datos accounds");
    const InsertAccounts = `INSERT OR REPLACE INTO ${LOCAL_DB_CUENTAS_NAME} (id, name, icon, uptodataBase, userOwnerID, grupal , color) VALUES (?, ?, ?, ?, ?, ?, ?);`;
    for (const account of DB_Cuentas) {
      await db.runAsync(InsertAccounts, [
        account.id,
        account.name,
        account.icon,
        account.uptodataBase ? 1 : 0,
        account.userOwnerID,
        account.grupal,
      ]);
    }

    if (DEVELOPMENT) {
      DEbug && console.log("iunsentando datos perfiles");
      const InsertPerfiles = `INSERT OR REPLACE INTO ${LOCAL_DB_PROFILES_NAME} (id, name, avatar_url, userOwnerID, userReferredID, uptodataBase, color) VALUES (?, ?, ?, ?, ?, ?, ?);`;
      for (const perfil of DB_PERFILES) {
        await db.runAsync(InsertPerfiles, [
          perfil.id,
          perfil.name,
          perfil.avatar_url,
          perfil.userOwnerID,
          perfil.userReferredID,
          perfil.uptodataBase ? 1 : 0,
          perfil.color,
        ]);
      }
      DEbug && console.log("iunsentando datos transacciones");
      const InsertTransacciones = `INSERT OR REPLACE INTO ${LOCAL_DB_TRANSACCIONES_NAME} (
      id,
      balance,
      type,
      date,
      description,
      categoryID,
      accountID,
      userOwnerID,
      prestadoaID,
      prestadoaName,
      pago,
      uptodataBase
         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
      for (const account of DB_Transacciones) {
        DEbug && console.log("iunsentando datos transaccion ID:", account.id);
        await db.runAsync(InsertTransacciones, [
          account.id, // id
          account.balance, // balance
          account.type, // type
          account.date, // date
          account.description, // description
          account.categoryID, // categoryID
          account.accountID, // accountID
          account.userOwnerID, // userOwnerID
          account.prestadoaID, // prestadoaID
          account.prestadoaName, // prestadoaName
          account.pago ? 1 : 0, // pago
          account.uptodataBase ? 1 : 0, // uptodataBase
        ]);
      }
      DEbug && console.log("iunsentando datos grupos");
      const InsertGrups = `INSERT OR REPLACE INTO ${LOCAL_DB_GRUPS_NAME} (id, name, icon, userOwnerID, uptodataBase, usersIdInGroup, color) VALUES (?, ?, ?, ?, ?, ?, ?);`;
      for (const grupo of DB_Groups) {
        await db.runAsync(InsertGrups, [
          grupo.id,
          grupo.name,
          grupo.icon,
          grupo.userOwnerID,
          grupo.uptodataBase,
          grupo.usersIdInGroup.join(","),
          grupo.color,
        ]);
      }
    }
  });
  DEbug && console.log("finalizado insertado");
  // }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

async function developmentMigrateDbIfNeeded(db: SQLiteDatabase) {
  console.log("debelopment borrando tablas");

  await db.execAsync(`PRAGMA user_version = ${0}`);
  await db.execAsync(`DROP TABLE IF EXISTS ${LOCAL_DB_CATEGORIAS_NAME}`);
  await db.execAsync(`DROP TABLE IF EXISTS ${LOCAL_DB_CUENTAS_NAME}`);
  await db.execAsync(`DROP TABLE IF EXISTS ${LOCAL_DB_TRANSACCIONES_NAME}`);
  await db.execAsync(`DROP TABLE IF EXISTS ${LOCAL_DB_PROFILES_NAME}`);
}
