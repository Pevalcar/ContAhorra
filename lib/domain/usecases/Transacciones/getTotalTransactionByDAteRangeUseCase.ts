import { TiposDeTransacciones, TransactionTotal } from "@/Types/types";
import TransaccionRepositoryI from "@/lib/domain/repositories/TransaccionRepository";

export class GetTotalTransactionsByDateRangeUseCase {
  constructor(
    private transaccionRepositoryLocal: TransaccionRepositoryI,
    private transaccionRepositoryRemote: TransaccionRepositoryI,
  ) {
    this.transaccionRepositoryLocal = transaccionRepositoryLocal;
    this.transaccionRepositoryRemote = transaccionRepositoryRemote;
  }

  async execute({
    startDate,
    endDate,
    type,
    accountID,
  }: {
    startDate?: number;
    endDate?: number;
    type?: TiposDeTransacciones;
    accountID?: string;
  }): Promise<TransactionTotal> {
    // Guardar siempre localmente
    return await this.transaccionRepositoryLocal.getTotalTransactionByDateRange(
      startDate,
      endDate,
      accountID,
      type,
    );
  }
}
