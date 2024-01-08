import { Prisma, Resposta } from '@prisma/client'

export interface RespostasRepository {
  create(data: Prisma.RespostaCreateInput): Promise<Resposta>
}
