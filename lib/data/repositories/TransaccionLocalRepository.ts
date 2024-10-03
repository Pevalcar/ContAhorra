import type { TransactionTotal } from "@/Types/types";
import { LOCAL_DB_TRANSACCIONES_NAME } from "@/lib/configs/config";
import { Transaccion } from "@/lib/domain/entities";
import { SQLiteControlError } from "@/lib/domain/error/SqlControlError";
import TransaccionRepositoryI from "@/lib/domain/repositories/TransaccionRepository";
import { openDatabaseAsync } from "expo-sqlite";

export class TransaccionLocalRepository implements TransaccionRepositoryI {
  private dbNAme: string;

  constructor(db: string) {
    this.dbNAme = db;
  }

  async getTrasaccionByDateRange(
    startDate: number,
    endDate: number,
    type?: string,
    accountID?: string,
  ): Promise<Transaccion[]> {
    const db = await openDatabaseAsync(this.dbNAme);
    try {
      let query = `SELECT * FROM ${LOCAL_DB_TRANSACCIONES_NAME} WHERE date BETWEEN ? AND ?`;
      const params: any[] = [startDate, endDate];

      if (type) {
        query += ` AND type = ?`;
        params.push(type);
      }

      if (accountID) {
        query += ` AND accountID = ?`;
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
        INSERT INTO ${LOCAL_DB_TRANSACCIONES_NAME} (id, title, balance, type, date, description, categoryID, accountID, userOwnerID, prestadoaID)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
      `;
      await db.runAsync(query, [
        transaccion.id,
        transaccion.title,
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
      SET title = ?, balance = ?, type = ?, date = ?, description = ?, categoryID = ?, accountID = ?, userOwnerID = ?, prestadoaID = ?
      WHERE id = ?
    `;
    try {
      await db.runAsync(query, [
        transaccion.title,
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
    startDate: number,
    endDate: number,
    accountID?: string,
  ): Promise<TransactionTotal> {
    const db = await openDatabaseAsync(this.dbNAme);
    try {
      let querry = `
      SELECT
      COALESCE(SUM(CASE WHEN type = 'Gasto' THEN balance ELSE 0 END), 0) AS totalExpenses,
      COALESCE(SUM(CASE WHEN type = 'Ingreso' THEN balance ELSE 0 END), 0) AS totalIncome,
      COALESCE(SUM(CASE WHEN type = 'Transferencia' THEN balance ELSE 0 END), 0) AS totalTransferences,
      COALESCE(SUM(CASE WHEN type = 'Préstamo' THEN balance ELSE 0 END), 0) AS totalPrestamos
      FROM ${LOCAL_DB_TRANSACCIONES_NAME} WHERE date >= ?  AND date <= ?;
      `;

      const params: any[] = [startDate, endDate];

      if (accountID) {
        querry += ` AND accountID = ?`;
        params.push(accountID);
      }

      const transactionsByMonth = await db.getAllAsync<TransactionTotal>(querry, params);
      return transactionsByMonth[0];
    } catch (error) {
      throw SQLiteControlError.getError(error);
    }
  }
}
