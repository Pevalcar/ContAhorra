import { DB_Categorias, DB_Cuentas, DB_Transacciones } from "../db/local/db_local";
import { Categoria, Cuenta, Transaccion } from "@/lib/domain/entities";

export const DEVELOPMENT = process.env.NODE_ENV !== "production";

export const LOCAL_DB_NAME = "mySQLiteDB.db";
export const DATABASE_VERSION = 2;
export const LOCAL_DB_TRANSACCIONES_NAME = "transacciones";
export const LOCAL_DB_CUENTAS_NAME = "accounts";
export const LOCAL_DB_PROFILES_NAME = "profiles";
export const LOCAL_DB_CATEGORIAS_NAME = "categories";
export const LOCAL_DB_GRUPS_NAME = "grupos";
export const DEFAULT_STATE: Transaccion[] = DB_Transacciones;
export const DEFAULT_STATE_CATEGORIAS: Categoria[] = DB_Categorias;
export const DEFAULT_STATE_CUENTAS: Cuenta[] = DB_Cuentas;

export const INITIALCATEGORY = "INITIALCATEGORY";
export const INITIALCUENTA = "INITIALCUENTA";

export const AVATAR_API_URL = "https://i.pravatar.cc";
