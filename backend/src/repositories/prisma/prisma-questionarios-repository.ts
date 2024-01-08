import { Prisma } from '@prisma/client'
import { QuestionariosRepository } from '../questionarios-repository'
import { prisma } from '@/lib/prisma'

export class PrismaQuestionariosRepository implements QuestionariosRepository {
  async create(data: Prisma.QuestionarioCreateInput) {
    const questionario = await prisma.questionario.create({ data })
    return questionario
  }

  async findAll() {
    const questionarios = await prisma.questionario.findMany()

    return questionarios
  }

  async findById(id: string) {
    const questionario = await prisma.questionario.findUnique({
      where: {
        id,
      },
    })

    return questionario
  }
}
