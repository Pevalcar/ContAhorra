import TransaccionRepositoryI from "@/lib/domain/repositories/TransaccionRepository";

export class DeleteCategoryUseCase {
  constructor(
    private transaccionRepositoryLocal: TransaccionRepositoryI,
    private transaccionRepositoryRemote: TransaccionRepositoryI,
  ) {
    this.transaccionRepositoryLocal = transaccionRepositoryLocal;
    this.transaccionRepositoryRemote = transaccionRepositoryRemote;
  }

  async execute(id: string): Promise<boolean> {
    // Guardar siempre localmente
    return await this.transaccionRepositoryLocal.deleteCategory(id);
  }
}
