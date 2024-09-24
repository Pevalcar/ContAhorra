import { DB_Categorias, DB_Cuentas, DB_Transacciones } from "./db/local/db_local";
import { type Categoria, type Cuenta, type Transaccion } from "@/Types/types";

export const DEVELOPMENT = process.env.NODE_ENV !== "production";

export const LOCAL_DB_TRANSACCIONES = "__transacctions__";
export const LOCAL_DB_CUENTAS = "__accounts__";
export const LOCAL_DB_CATEGORIAS = "__categories__";
export const DEFAULT_STATE: Transaccion[] = DB_Transacciones;
export const DEFAULT_STATE_CATEGORIAS: Categoria[] = DB_Categorias;
export const DEFAULT_STATE_CUENTAS: Cuenta[] = DB_Cuentas;

export const INITIALCATEGORY = "INITIALCATEGORY";
export const INITIALCUENTA = "INITIALCUENTA";

export const AVATAR_API_URL = "https://i.pravatar.cc";
