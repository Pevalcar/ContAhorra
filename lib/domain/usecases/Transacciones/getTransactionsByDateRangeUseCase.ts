import { Transaccion } from "@/lib/domain/entities";
import TransaccionRepositoryI from "@/lib/domain/repositories/TransaccionRepository";

export class GetTransactionsByDateRangeUseCase {
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
  ): Promise<Transaccion[]> {
    // Guardar siempre localmente
    return await this.transaccionRepositoryLocal.getTrasaccionByDateRange(
      startDate,
      endDate,
      type,
      accountID,
    );
  }
}
