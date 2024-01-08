import { PrismaUsuariosRepository } from '@/repositories/prisma/prisma-usuarios-repository'
import { ListarUsuariosUseCase } from '@/useCases/listar-usuarios-usecase'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function ListarUsuariosController(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const usuariosRepository = new PrismaUsuariosRepository()
  const listarUsuariosUseCase = new ListarUsuariosUseCase(usuariosRepository)

  const usuarios = await listarUsuariosUseCase.execute()

  return response.status(200).send(usuarios)
}
