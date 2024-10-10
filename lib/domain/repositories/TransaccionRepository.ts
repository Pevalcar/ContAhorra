import type { TiposDeTransacciones, TransactionTotal, userOwnerID } from "@/Types/types";
import { Categoria, Cuenta, Group, Perfil, Transaccion } from "@/lib/domain/entities";

export default class TransaccionRepositoryI {
  addTransaction(data: Transaccion): Promise<void> {
    throw new Error("Method not implemented.");
  }
  addCategory(data: Categoria): Promise<void> {
    throw new Error("Method not implemented.");
  }
  addAccount(data: Cuenta): Promise<void> {
    throw new Error("Method not implemented.");
  }
  addProfile(data: Perfil): Promise<void> {
    throw new Error("Method not implemented.");
  }
  updateTransaction(data: Transaccion): Promise<void> {
    throw new Error("Method not implemented.");
  }

  updateCategory(data: Categoria): Promise<void> {
    throw new Error("Method not implemented.");
  }

  updateAccount(data: Cuenta): Promise<void> {
    throw new Error("Method not implemented.");
  }

  updateProfile(data: Perfil): Promise<void> {
    throw new Error("Method not implemented.");
  }

  deleteTransaction(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  deleteCategory(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  deleteAccount(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  deleteProfile(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  getAllTransaction(): Promise<Transaccion[]> {
    throw new Error("Method not implemented.");
  }

  getTrasaccionByDateRange(
    startDate?: number,
    endDate?: number,
    type?: string | null,
    accountID?: string | null,
  ): Promise<Transaccion[]> {
    throw new Error("Method not implemented.");
  }
  getTotalTransactionByDateRange(
    startDate?: number,
    endDate?: number,
    accountID?: string,
    type?: TiposDeTransacciones,
  ): Promise<TransactionTotal> {
    throw new Error("Method not implemented.");
  }
  //TODO impleemntar estos use Cases

  getAllCategory({
    userOwnerID,
    type,
  }: {
    userOwnerID?: userOwnerID;
    type?: TiposDeTransacciones;
  }): Promise<Categoria[]> {
    throw new Error("Method not implemented.");
  }

  getAllAccount({ userOwnerID }: { userOwnerID?: userOwnerID }): Promise<Cuenta[]> {
    throw new Error("Method not implemented.");
  }

  getAllProfileByUserOwnerID(userOwnerID?: userOwnerID): Promise<Perfil[]> {
    throw new Error("Method not implemented.");
  }
  getProfileByID(id: string): Promise<Perfil> {
    throw new Error("Method not implemented.");
  }

  //Groups
  addGroup(data: Group): Promise<void> {
    throw new Error("Method not implemented.");
  }
  updateGroup(data: Group): Promise<void> {
    throw new Error("Method not implemented.");
  }

  deleteGroup(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  getAllGroup(userOwnerID?: userOwnerID): Promise<Group[]> {
    throw new Error("Method not implemented.");
  }
}
