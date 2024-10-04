import type { userOwnerID } from "@/Types/types";
import { Cuenta } from "@/lib/domain/entities";
import TransaccionRepositoryI from "@/lib/domain/repositories/TransaccionRepository";

export class GetAllAccountUseCase {
  constructor(
    private transaccionRepositoryLocal: TransaccionRepositoryI,
    private transaccionRepositoryRemote: TransaccionRepositoryI,
  ) {
    this.transaccionRepositoryLocal = transaccionRepositoryLocal;
    this.transaccionRepositoryRemote = transaccionRepositoryRemote;
  }

  async execute(userOwnerID?: userOwnerID): Promise<Cuenta[]> {
    // Guardar siempre localmente
    return await this.transaccionRepositoryLocal.getAllAccount({ userOwnerID });
  }
}
