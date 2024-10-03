import { Transaccion } from "@/lib/domain/entities";
import TransaccionRepositoryI from "@/lib/domain/repositories/TransaccionRepository";

export class GetAllUseCase {
  constructor(
    private transaccionRepositoryLocal: TransaccionRepositoryI,
    private transaccionRepositoryRemote: TransaccionRepositoryI,
  ) {
    this.transaccionRepositoryLocal = transaccionRepositoryLocal;
    this.transaccionRepositoryRemote = transaccionRepositoryRemote;
  }

  async execute(): Promise<Transaccion[]> {
    // Guardar siempre localmente
    return await this.transaccionRepositoryLocal.getAll();
  }
}
