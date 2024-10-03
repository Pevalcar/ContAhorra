import type { TransactionTotal } from "@/Types/types";
import { Transaccion } from "@/lib/domain/entities";

export default class TransaccionRepositoryI {
  getAll(): Promise<Transaccion[]> {
    throw new Error("Method not implemented.");
  }

  add(data: Transaccion): Promise<void> {
    throw new Error("Method not implemented.");
  }
  update(data: Transaccion): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  getTrasaccionByDateRange(
    startDate: number,
    endDate: number,
    type?: string,
    accountID?: string,
  ): Promise<Transaccion[]> {
    throw new Error("Method not implemented.");
  }
  getTotalTransactionByDateRange(
    startDate: number,
    endDate: number,
    accountID?: string,
  ): Promise<TransactionTotal> {
    throw new Error("Method not implemented.");
  }
}
