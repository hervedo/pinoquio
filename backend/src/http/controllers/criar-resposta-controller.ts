import { PrismaRespostasRepository } from '@/repositories/prisma/prisma-respostas-repository'
import { CriarRespostaUseCase } from '@/useCases/criar-resposta-usecase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function CriarRespostaController(
  request: FastifyRequest,
  response: FastifyReply,
) {
  // const RespostaSchema = z.object({
  //   questionarioId: z.string().uuid(),
  //   respostas: z.object(),
  //   latitude: z.number(),
  //   longitude: z.number(),
  // })

  const { questionarioId, respostas, latitude, longitude, usuarioId } =
    request.body

  try {
    const prismaRespostasRepository = new PrismaRespostasRepository()
    const criarRespostaUseCase = new CriarRespostaUseCase(
      prismaRespostasRepository,
    )

    const resposta = await criarRespostaUseCase.execute({
      questionarioId,
      respostas,
      latitude,
      longitude,
      usuarioId,
    })

    return response.status(200).send(resposta)
  } catch (err) {
    return response.status(409).send()
  }
}
