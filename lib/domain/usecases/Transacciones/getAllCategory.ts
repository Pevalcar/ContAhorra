import { TiposDeTransacciones, userOwnerID } from "@/Types/types";
import { Categoria } from "@/lib/domain/entities";
import TransaccionRepositoryI from "@/lib/domain/repositories/TransaccionRepository";

export class GetAllCategoryUseCase {
  constructor(
    private transaccionRepositoryLocal: TransaccionRepositoryI,
    private transaccionRepositoryRemote: TransaccionRepositoryI,
  ) {
    this.transaccionRepositoryLocal = transaccionRepositoryLocal;
    this.transaccionRepositoryRemote = transaccionRepositoryRemote;
  }

  async execute(userOwnerID?: userOwnerID, type?: TiposDeTransacciones): Promise<Categoria[]> {
    // Guardar siempre localmente
    return await this.transaccionRepositoryLocal.getAllCategory({ userOwnerID, type });
  }
}
