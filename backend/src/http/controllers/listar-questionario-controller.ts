import { PrismaQuestionariosRepository } from '@/repositories/prisma/prisma-questionarios-repository'
import { ListarQuestionarioUseCase } from '@/useCases/listar-questionario-usecase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function ListarQuestionarioController(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const questionariosRepository = new PrismaQuestionariosRepository()
  const listarQuestionarioUseCase = new ListarQuestionarioUseCase(
    questionariosRepository,
  )

  const paramsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = paramsSchema.parse(request.params)

  const questionario = await listarQuestionarioUseCase.execute({ id })

  return response.status(200).send(questionario)
}
