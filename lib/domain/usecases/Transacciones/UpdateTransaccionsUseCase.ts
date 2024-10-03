import { Transaccion } from "@/lib/domain/entities";
import TransaccionRepositoryI from "@/lib/domain/repositories/TransaccionRepository";

export class UpdateTransaccionsUseCase {
  constructor(
    private transaccionRepositoryLocal: TransaccionRepositoryI,
    private transaccionRepositoryRemote: TransaccionRepositoryI,
  ) {
    this.transaccionRepositoryLocal = transaccionRepositoryLocal;
    this.transaccionRepositoryRemote = transaccionRepositoryRemote;
  }

  async execute(data: Transaccion): Promise<void> {
    // Guardar siempre localmente
    await this.transaccionRepositoryLocal.update(data);
  }
}
