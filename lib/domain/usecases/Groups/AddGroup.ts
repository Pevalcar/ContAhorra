import { Group } from "@/lib/domain/entities";
import TransaccionRepositoryI from "@/lib/domain/repositories/TransaccionRepository";

export class AddGoupUseCase {
  constructor(
    private transaccionRepositoryLocal: TransaccionRepositoryI,
    private transaccionRepositoryRemote: TransaccionRepositoryI,
  ) {
    this.transaccionRepositoryLocal = transaccionRepositoryLocal;
    this.transaccionRepositoryRemote = transaccionRepositoryRemote;
  }

  async execute(data: Group): Promise<void> {
    // Guardar siempre localmente
    return await this.transaccionRepositoryLocal.addGroup(data);
  }
}
