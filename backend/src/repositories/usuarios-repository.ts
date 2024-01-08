import { Prisma, Usuario } from '@prisma/client'

export interface UsuariosRepository {
  create(data: Prisma.UsuarioCreateInput): Promise<Usuario>
  findByEmail(email: string): Promise<Usuario | null>
  findAll(): Promise<Usuario[]>
}
