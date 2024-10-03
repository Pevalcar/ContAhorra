import { LOCAL_DB_TRANSACCIONES_NAME } from "@/lib/configs/config";
import { Transaccion } from "@/lib/domain/entities";
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
  }

  async add(transaccion: Transaccion): Promise<void> {
    const db = await openDatabaseAsync(this.dbNAme);
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
  }

  async deleteTransaccion(id: string): Promise<void> {
    const db = await openDatabaseAsync(this.dbNAme);
    const query = `DELETE FROM ${LOCAL_DB_TRANSACCIONES_NAME} WHERE id = ?`;
    await db.runAsync(query, [id]);
  }

  async delete(id: string): Promise<boolean> {
    const db = await openDatabaseAsync(this.dbNAme);
    const query = `DELETE FROM ${LOCAL_DB_TRANSACCIONES_NAME} WHERE id = ?`;
    await db.runAsync(query, [id]);
    return true;
  }
  async update(transaccion: Transaccion): Promise<void> {
    const db = await openDatabaseAsync(this.dbNAme);
    const query = `
      UPDATE ${LOCAL_DB_TRANSACCIONES_NAME}
      SET title = ?, balance = ?, type = ?, date = ?, description = ?, categoryID = ?, accountID = ?, userOwnerID = ?, prestadoaID = ?
      WHERE id = ?
    `;
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
  }

  async getAll(): Promise<Transaccion[]> {
    const db = await openDatabaseAsync(this.dbNAme);
    const query = `SELECT * FROM ${LOCAL_DB_TRANSACCIONES_NAME}`;
    const results = await db.getAllAsync<Transaccion>(query);
    return results.map((row) => new Transaccion(row));
  }
}
