import { Prisma } from '@prisma/client'
import { RespostasRepository } from '../respostas-respository'
import { prisma } from '@/lib/prisma'

export class PrismaRespostasRepository implements RespostasRepository {
  async findAll() {
    const respostas = await prisma.resposta.findMany()

    return respostas
  }

  async create(data: Prisma.RespostaCreateInput) {
    const resposta = await prisma.resposta.create({ data })

    return resposta
  }
}
