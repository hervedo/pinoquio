import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { UsuariosRepository } from '../usuarios-repository'

export class PrismaUsuariosRepository implements UsuariosRepository {
  async create(data: Prisma.UsuarioCreateInput) {
    const usuario = await prisma.usuario.create({
      data,
    })

    return usuario
  }

  async findAll() {
    const usuarios = await prisma.usuario.findMany()

    return usuarios
  }

  async findByEmail(email: string) {
    const usuario = await prisma.usuario.findUnique({
      where: { email },
    })

    return usuario
  }
}
