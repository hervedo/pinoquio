import { Prisma, Resposta } from '@prisma/client'

export interface RespostasRepository {
  findAll(): Promise<Resposta[]>
  create(data: Prisma.RespostaCreateInput): Promise<Resposta>
}
