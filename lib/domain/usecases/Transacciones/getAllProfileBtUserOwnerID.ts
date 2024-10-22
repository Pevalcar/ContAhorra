import { Perfil } from "@/lib/domain/entities";
import TransaccionRepositoryI from "@/lib/domain/repositories/TransaccionRepository";

export class GetAllProfileByUserOwnerIDUseCase {
  constructor(
    private transaccionRepositoryLocal: TransaccionRepositoryI,
    private transaccionRepositoryRemote: TransaccionRepositoryI,
  ) {
    this.transaccionRepositoryLocal = transaccionRepositoryLocal;
    this.transaccionRepositoryRemote = transaccionRepositoryRemote;
  }

  async execute(userOwnerID?: string): Promise<Perfil[]> {
    // Guardar siempre localmente
    //TODO implementar si esa funcionando el woner
    return await this.transaccionRepositoryLocal.getAllProfileByUserOwnerID(userOwnerID);
  }
}
