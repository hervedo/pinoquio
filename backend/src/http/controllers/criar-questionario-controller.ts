import { PrismaQuestionariosRepository } from '@/repositories/prisma/prisma-questionarios-repository'
import { CriarQuestionarioUseCase } from '@/useCases/criar-questionario-usecase'
import { FastifyReply, FastifyRequest } from 'fastify'
// import { z } from 'zod'

export async function CriarQuestionarioController(
  request: FastifyRequest,
  response: FastifyReply,
) {
  // const questionarioBodySchema = z.object({
  //   nome: z.string(),
  //   perguntas: z.object({
  //     '1': z.object({
  //       pergunta: z.string(),
  //       respostas: z.object({
  //         a: z.string(),
  //       }),
  //     }),
  //   }),
  //   usuarioId: z.string().uuid(),
  // })

  const { nome, perguntas, usuarioId } = request.body

  try {
    const prismaQuestionariosRepository = new PrismaQuestionariosRepository()
    const criarQuestionarioUseCase = new CriarQuestionarioUseCase(
      prismaQuestionariosRepository,
    )

    const questionario = criarQuestionarioUseCase.execute({
      nome,
      perguntas,
      usuarioId,
    })

    return response.status(200).send(questionario)
  } catch (err) {
    return response.status(409).send()
  }
}
