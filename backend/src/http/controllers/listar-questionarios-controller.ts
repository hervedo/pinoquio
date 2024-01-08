import { ListarQuestionariosUseCase } from '@/useCases/listar-questionarios-usecase'

import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaQuestionariosRepository } from '@/repositories/prisma/prisma-questionarios-repository'

export async function ListarQuestionariosController(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const questionariosRepository = new PrismaQuestionariosRepository()
  const listarQuestionariosUseCase = new ListarQuestionariosUseCase(
    questionariosRepository,
  )

  const questionarios = await listarQuestionariosUseCase.execute()

  return response.status(200).send(questionarios)
}
