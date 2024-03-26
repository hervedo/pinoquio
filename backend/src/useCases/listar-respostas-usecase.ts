import { RespostasRepository } from '@/repositories/respostas-respository'

export class ListarRespostasUseCase {
  constructor(private respostasRepository: RespostasRepository) {}

  async execute() {
    const respostas = await this.respostasRepository.findAll()

    return respostas
  }
}
