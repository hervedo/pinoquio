import { Prisma } from '@prisma/client'
import { RespostasRepository } from '../respostas-respository'
import { prisma } from '@/lib/prisma'

export class PrismaRespostasRepository implements RespostasRepository {
  async create(data: Prisma.RespostaCreateInput) {
    console.log(data)
    const resposta = await prisma.resposta.create({ data })

    return resposta
  }
}
