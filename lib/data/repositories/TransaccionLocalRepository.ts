import type { TiposDeTransacciones, TransactionTotal, userOwnerID } from "@/Types/types";
import {
  LOCAL_DB_CATEGORIAS_NAME,
  LOCAL_DB_CUENTAS_NAME,
  LOCAL_DB_TRANSACCIONES_NAME,
} from "@/lib/configs/config";
import { Categoria, Cuenta, Perfil, Transaccion } from "@/lib/domain/entities";
import { SQLiteControlError } from "@/lib/domain/error/SqlControlError";
import TransaccionRepositoryI from "@/lib/domain/repositories/TransaccionRepository";
import { openDatabaseAsync } from "expo-sqlite";

export class TransaccionLocalRepository implements TransaccionRepositoryI {
  private dbNAme: string;

  constructor(db: string) {
    this.dbNAme = db;
  }
  updateProfile(data: Perfil): Promise<void> {
    throw new Error("Method not implemented.");
  }
  // CATEGORIAS

  addCategory(data: Categoria): Promise<void> {
    throw new Error("Method not implemented.");
  }
  updateCategory(data: Categoria): Promise<void> {
    throw new Error("Method not implemented.");
  }
  deleteCategory(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  async getAllCategory({
    userOwnerID,
    type,
  }: {
    userOwnerID?: userOwnerID;
    type?: TiposDeTransacciones;
  }): Promise<Categoria[]> {
    const db = await openDatabaseAsync(this.dbNAme);
    try {
      let query = `SELECT * FROM ${LOCAL_DB_CATEGORIAS_NAME} WHERE userOwnerID = ? OR userOwnerID IS "1"`;
      const params: any[] = [userOwnerID];
      if (type) {
        query += ` AND type = ?`;
        params.push(type);
      }
      const results = await db.getAllAsync<Categoria>(query, params);
      if (results.length === 0) {
        return [];
      }
      const categorías = results.map((row) => new Categoria(row));
      return categorías;
    } catch (error) {
      throw SQLiteControlError.getError(error);
    }
  }
  // CUENTAS
  addAccount(data: Cuenta): Promise<void> {
    throw new Error("Method not implemented.");
  }
  updateAccount(data: Cuenta): Promise<void> {
    throw new Error("Method not implemented.");
  }
  deleteAccount(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  async getAllAccount({ userOwnerID }: { userOwnerID?: userOwnerID }): Promise<Cuenta[]> {
    const db = await openDatabaseAsync(this.dbNAme);
    try {
      let query = `SELECT * FROM ${LOCAL_DB_CUENTAS_NAME} WHERE userOwnerID = ? OR userOwnerID IS "1"`;
      const params: any[] = [userOwnerID];
      const results = await db.getAllAsync<Cuenta>(query, params);
      if (results.length === 0) {
        return [];
      }
      const cuentas = results.map((row) => new Cuenta(row));
      return cuentas;
    } catch (error) {
      throw SQLiteControlError.getError(error);
    }
  }
  // PERFILS
  addProfile(data: Perfil): Promise<void> {
    throw new Error("Method not implemented.");
  }
  deleteProfile(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  getAllProfileByUserOwnerID(userOwnerID?: userOwnerID): Promise<Perfil[]> {
    throw new Error("Method not implemented.");
  }
  getProfileByID(id: string): Promise<Perfil> {
    throw new Error("Method not implemented.");
  }
  // tRANSACCIONES
  async getTrasaccionByDateRange(
    startDate?: number,
    endDate?: number,
    type?: string,
    accountID?: string,
  ): Promise<Transaccion[]> {
    const db = await openDatabaseAsync(this.dbNAme);
    try {
      let query = `SELECT * FROM ${LOCAL_DB_TRANSACCIONES_NAME} `;
      const params: any[] = [];
      if (startDate && endDate) {
        query += ` WHERE date BETWEEN ? AND ?`;
        params.push(startDate);
        params.push(endDate);
      }
      if (type) {
        if (params.length === 0) {
          query += ` WHERE type = ?`;
        } else {
          query += ` AND type = ?`;
        }
        params.push(type);
      }

      if (accountID) {
        if (params.length === 0) {
          query += ` WHERE accountID = ?`;
        } else {
          query += ` AND accountID = ?`;
        }
        params.push(accountID);
      }

      const results = await db.getAllAsync<Transaccion>(query, params);

      return results.map((row) => new Transaccion(row));
    } catch (error) {
      throw SQLiteControlError.getError(error);
    }
  }

  async addTransaction(transaccion: Transaccion): Promise<void> {
    const db = await openDatabaseAsync(this.dbNAme);
    try {
      const query = `
        INSERT INTO ${LOCAL_DB_TRANSACCIONES_NAME} (id, balance, type, date, description, categoryID, accountID, userOwnerID, prestadoaID)
        VALUES (?, ?, ?, ?, ?, ?, ?,  ?, ?);
      `;
      await db.runAsync(query, [
        transaccion.id,
        transaccion.balance,
        transaccion.type,
        transaccion.date,
        transaccion.description,
        transaccion.categoryID,
        transaccion.accountID,
        transaccion.userOwnerID,
        transaccion.prestadoaID,
      ]);
    } catch (error) {
      throw SQLiteControlError.getError(error);
    }
  }

  async deleteTransaccion(id: string): Promise<void> {
    const db = await openDatabaseAsync(this.dbNAme);
    try {
      const query = `DELETE FROM ${LOCAL_DB_TRANSACCIONES_NAME} WHERE id = ?`;
      await db.runAsync(query, [id]);
    } catch (error) {
      throw SQLiteControlError.getError(error);
    }
  }

  async deleteTransaction(id: string): Promise<boolean> {
    const db = await openDatabaseAsync(this.dbNAme);
    try {
      const query = `DELETE FROM ${LOCAL_DB_TRANSACCIONES_NAME} WHERE id = ?`;
      await db.runAsync(query, [id]);
      return true;
    } catch (error) {
      throw SQLiteControlError.getError(error);
    }
  }
  async updateTransaction(transaccion: Transaccion): Promise<void> {
    const db = await openDatabaseAsync(this.dbNAme);
    const query = `
      UPDATE ${LOCAL_DB_TRANSACCIONES_NAME}
      SET  balance = ?, type = ?, date = ?, description = ?, categoryID = ?, accountID = ?, userOwnerID = ?, prestadoaID = ?
      WHERE id = ?
    `;
    try {
      await db.runAsync(query, [
        transaccion.balance,
        transaccion.type,
        transaccion.date,
        transaccion.description,
        transaccion.categoryID,
        transaccion.accountID,
        transaccion.userOwnerID,
        transaccion.prestadoaID,
        transaccion.id,
      ]);
    } catch (error) {
      throw SQLiteControlError.getError(error);
    }
  }

  async getAllTransaction(): Promise<Transaccion[]> {
    const db = await openDatabaseAsync(this.dbNAme);
    try {
      const query = `SELECT * FROM ${LOCAL_DB_TRANSACCIONES_NAME}`;
      const results = await db.getAllAsync<Transaccion>(query);
      return results.map((row) => new Transaccion(row));
    } catch (error) {
      throw SQLiteControlError.getError(error);
    }
  }

  async getTotalTransactionByDateRange(
    startDate?: number,
    endDate?: number,
    accountID?: string,
    type?: TiposDeTransacciones,
  ): Promise<TransactionTotal> {
    const db = await openDatabaseAsync(this.dbNAme);
    try {
      let querry = `
      SELECT
      COALESCE(SUM(CASE WHEN type = 'Gasto' THEN balance ELSE 0 END), 0) AS totalExpenses,
      COALESCE(SUM(CASE WHEN type = 'Ingreso' THEN balance ELSE 0 END), 0) AS totalIncome,
      COALESCE(SUM(CASE WHEN type = 'Transferencia' THEN balance ELSE 0 END), 0) AS totalTransfer
      FROM ${LOCAL_DB_TRANSACCIONES_NAME} 
      `;
      const params: any[] = [];
      if (startDate && endDate) {
        querry += ` WHERE date >= ?  AND date <= ?`;
        params.push(startDate);
        params.push(endDate);
      }

      if (accountID) {
        querry += ` AND accountID = ?`;
        params.push(accountID);
      }
      if (type) {
        querry += ` AND type = ?`;
        params.push(type);
      }
      const transactionsByMonth = await db.getAllAsync<TransactionTotal>(querry, params);
      return transactionsByMonth[0];
    } catch (error) {
      throw SQLiteControlError.getError(error);
    }
  }
}
