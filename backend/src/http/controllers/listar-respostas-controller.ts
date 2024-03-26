import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaRespostasRepository } from '@/repositories/prisma/prisma-respostas-repository'
import { ListarRespostasUseCase } from '@/useCases/listar-respostas-usecase'

export async function ListarRespostasController(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const respostasRepository = new PrismaRespostasRepository()
  const listarRespostasUseCase = new ListarRespostasUseCase(respostasRepository)

  const respostas = await listarRespostasUseCase.execute()

  return response.status(200).send(respostas)
}
