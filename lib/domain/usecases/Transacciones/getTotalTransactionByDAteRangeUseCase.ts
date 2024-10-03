import { TransactionTotal } from "@/Types/types";
import TransaccionRepositoryI from "@/lib/domain/repositories/TransaccionRepository";

export class GetTotalTransactionsByDateRangeUseCase {
  constructor(
    private transaccionRepositoryLocal: TransaccionRepositoryI,
    private transaccionRepositoryRemote: TransaccionRepositoryI,
  ) {
    this.transaccionRepositoryLocal = transaccionRepositoryLocal;
    this.transaccionRepositoryRemote = transaccionRepositoryRemote;
  }

  async execute(
    startDate: number,
    endDate: number,
    type?: string,
    accountID?: string,
  ): Promise<TransactionTotal> {
    // Guardar siempre localmente
    return await this.transaccionRepositoryLocal.getTotalTransactionByDateRange(
      startDate,
      endDate,
      accountID,
    );
  }
}
