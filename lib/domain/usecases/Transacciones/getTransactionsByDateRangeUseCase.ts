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

  async execute({
    startDate,
    endDate,
    type,
    accountID,
  }: {
    startDate?: number;
    endDate?: number;
    type?: string | null;
    accountID?: string;
  }): Promise<Transaccion[]> {
    // Guardar siempre localmente
    return await this.transaccionRepositoryLocal.getTrasaccionByDateRange(
      startDate,
      endDate,
      type,
      accountID,
    );
  }
}
