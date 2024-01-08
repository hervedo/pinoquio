import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { CriarUsuarioUseCase } from '@/useCases/criar-usuario-usecase'
import { PrismaUsuariosRepository } from '@/repositories/prisma/prisma-usuarios-repository'
import { UsuarioExistente } from '@/errors/usuario-existente'

// interface usuario {
//   nome: string
//   email: string
//   senha: string
//   verificado: boolean
//   acesso: boolean
// }

export async function CriarUsuarioController(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const usuarioBodySchema = z.object({
    nome: z.string(),
    email: z.string().email(),
    senha: z.string().min(6),
    nivel: z.string(),
    acesso: z.boolean(),
  })

  const { nome, email, senha, nivel, acesso } = usuarioBodySchema.parse(
    request.body,
  )

  try {
    const usuariosRepository = new PrismaUsuariosRepository()
    const criarUsuarioUseCase = new CriarUsuarioUseCase(usuariosRepository)

    const usuario = await criarUsuarioUseCase.execute({
      nome,
      email,
      senha,
      nivel,
      acesso,
    })
    return response.status(200).send(usuario)
  } catch (err) {
    if (err instanceof UsuarioExistente) {
      return response.status(409).send({ message: err.message })
    }
    return response.status(500).send()
  }
}
