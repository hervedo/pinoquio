import { PrismaQuestionariosRepository } from '@/repositories/prisma/prisma-questionarios-repository'
import { CriarQuestionarioUseCase } from '@/useCases/criar-questionario-usecase'
import { Prisma } from '@prisma/client'
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

  console.log('Entrou Controller Questionario')

  const { nome, perguntas, usuarioId } = request.body

  console.log(nome)
  console.log(usuarioId)
  console.log(perguntas)

  try {
    const prismaQuestionariosRepository = new PrismaQuestionariosRepository()
    const criarQuestionarioUseCase = new CriarQuestionarioUseCase(
      prismaQuestionariosRepository,
    )

    const perguntasJSON = perguntas as Prisma.JsonArray

    const questionario = criarQuestionarioUseCase.execute({
      nome,
      perguntas: perguntasJSON,
      usuarioId,
    })

    return response.status(200).send(questionario)
  } catch (err) {
    return response.status(409).send()
  }
}
