import type { TiposDeTransacciones, TransactionTotal, userOwnerID } from "@/Types/types";
import {
  LOCAL_DB_CATEGORIAS_NAME,
  LOCAL_DB_CUENTAS_NAME,
  LOCAL_DB_GRUPS_NAME,
  LOCAL_DB_PROFILES_NAME,
  LOCAL_DB_TRANSACCIONES_NAME,
} from "@/lib/configs/config";
import { Categoria, Cuenta, Group, Perfil, Transaccion } from "@/lib/domain/entities";
import { SQLiteControlError } from "@/lib/domain/error/SqlControlError";
import TransaccionRepositoryI from "@/lib/domain/repositories/TransaccionRepository";
import { openDatabaseAsync } from "expo-sqlite";

export class TransaccionLocalRepository implements TransaccionRepositoryI {
  private dbNAme: string;

  constructor(db: string) {
    this.dbNAme = db;
  }

  addGroup(data: Group): Promise<void> {
    throw new Error("Method not implemented.");
  }
  updateGroup(data: Group): Promise<void> {
    throw new Error("Method not implemented.");
  }
  deleteGroup(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  async getAllGroup(userOwnerID?: userOwnerID): Promise<Group[]> {
    try {
      const db = await openDatabaseAsync(this.dbNAme);

      let query = `SELECT * FROM ${LOCAL_DB_GRUPS_NAME} WHERE userOwnerID = ? OR userOwnerID IS "1"`;
      const params: any[] = [userOwnerID];
      const results = await db.getAllAsync<Group>(query, params);
      if (results.length === 0) {
        return [];
      }
      const grupos = results.map((row) => {
        //@ts-ignore
        const usersIdInGroup = row.usersIdInGroup.split(",");
        return new Group({
          id: row.id,
          name: row.name,
          icon: row.icon,
          userOwnerID: row.userOwnerID,
          uptodataBase: row.uptodataBase,
          usersIdInGroup: usersIdInGroup,
          color: row.color,
        });
      });
      return grupos;
    } catch (error) {
      throw SQLiteControlError.getError(error);
    }
  }
  updateProfile(data: Perfil): Promise<void> {
    throw new Error("Method not implemented.");
  }
  // CATEGORIAS

  async addCategory(data: Categoria): Promise<void> {
    const db = await openDatabaseAsync(this.dbNAme);
    try {
      const query = `
        INSERT INTO ${LOCAL_DB_CATEGORIAS_NAME} (
        id,
        name,
        icon,
        userOwnerID,
        uptodataBase,
        type,
        color,
        prestamo
        )
        VALUES (?, ?, ?, ?, ?,?,?,?);
      `;
      await db.runAsync(query, [
        data.id,
        data.name,
        data.icon,
        data.userOwnerID,
        data.uptodataBase ? 1 : 0,
        data.type,
        data.color,
        data.prestamo ? 1 : 0,
      ]);
    } catch (error) {
      throw SQLiteControlError.getError(error);
    }
  }
  async updateCategory(data: Categoria): Promise<void> {
    const db = await openDatabaseAsync(this.dbNAme);
    try {
      const query = `
        UPDATE ${LOCAL_DB_CATEGORIAS_NAME}
        SET 
        name = ?, 
        icon = ?, 
        userOwnerID = ?, 
        uptodataBase = ?,
        type = ?,
        color = ?,
        prestamo = ?
        WHERE id = ?
      `;
      await db.runAsync(query, [
        data.name,
        data.icon,
        data.userOwnerID,
        data.uptodataBase ? 1 : 0,
        data.type,
        data.color,
        data.prestamo ? 1 : 0,
        data.id,
      ]);
    } catch (error) {
      throw SQLiteControlError.getError(error);
    }
  }
  async deleteCategory(id: string): Promise<boolean> {
    const db = await openDatabaseAsync(this.dbNAme);
    try {
      const DeleteQuerry = `
       DELETE FROM ${LOCAL_DB_CATEGORIAS_NAME} WHERE id = ?;
      `;
      await db.runAsync(DeleteQuerry, [id]);
      return true;
    } catch (error) {
      throw SQLiteControlError.getError(error);
    }
  }
  async getCatgoryByID(id: string): Promise<Categoria | null> {
    //TODO contemplar eliminar
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
      // Agregar la cláusula ORDER BY para ordenar por type en orden descendente
      query += ` ORDER BY type DESC`;
      const results = await db.getAllAsync<Categoria>(query, params);
      if (results.length === 0) {
        return [];
      }
      const categorías = results.map((row) => {
        return Categoria.FromSQLite(row);
      });
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
  async addProfile(data: Perfil): Promise<void> {
    try {
      const db = await openDatabaseAsync(this.dbNAme);
      const query = `
        INSERT INTO ${LOCAL_DB_PROFILES_NAME} (id, name, avatar_url, userOwnerID, userReferredID, uptodataBase)
        VALUES (?, ?, ?, ?, ?, ?);
      `;
      await db.runAsync(query, [
        data.id,
        data.name,
        data.avatar_url,
        data.userOwnerID,
        data.userReferredID,
        data.uptodataBase,
      ]);
    } catch (error) {
      throw SQLiteControlError.getError(error);
    }
  }
  deleteProfile(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  async getAllProfileByUserOwnerID(userOwnerID?: userOwnerID): Promise<Perfil[]> {
    const db = await openDatabaseAsync(this.dbNAme);
    try {
      let query = `SELECT * FROM ${LOCAL_DB_PROFILES_NAME} WHERE userOwnerID = ? OR userOwnerID IS "1"`;
      const params: any[] = [userOwnerID];
      const results = await db.getAllAsync<Perfil>(query, params);
      if (results.length === 0) {
        return [];
      }
      const perfiles = results.map((row) => new Perfil(row));
      return perfiles;
    } catch (error) {
      throw SQLiteControlError.getError(error);
    }
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

      return results.map((row) => {
        return Transaccion.FromSQLite(row);
      });
    } catch (error) {
      throw SQLiteControlError.getError(error);
    }
  }

  async addTransaction(transaccion: Transaccion): Promise<void> {
    const db = await openDatabaseAsync(this.dbNAme);
    try {
      const query = `
        INSERT INTO ${LOCAL_DB_TRANSACCIONES_NAME} (
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
        )
        VALUES (?, ?, ?, ?, ?, ?, ?,  ?, ?, ?, ?, ?);
      `;
      await db.runAsync(query, [
        transaccion.id, // id
        transaccion.balance, // balance
        transaccion.type, // type
        transaccion.date, // date
        transaccion.description, // description
        transaccion.categoryID, // categoryID
        transaccion.accountID, // accountID
        transaccion.userOwnerID, // userOwnerID
        transaccion.prestadoaID, // prestadoaID
        transaccion.prestadoaName, // prestadoaName
        transaccion.pago ? 1 : 0, // pago
        transaccion.uptodataBase ? 1 : 0, // uptodataBase
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
      SET  
      balance = ?, 
      type = ?, 
      date = ?, 
      description = ?, 
      categoryID = ?, 
      accountID = ?, 
      userOwnerID = ?, 
      prestadoaID = ?,
      pago = ?,
      uptodataBase = ?
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
        transaccion.pago ? 1 : 0,
        transaccion.uptodataBase ? 1 : 0,
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
