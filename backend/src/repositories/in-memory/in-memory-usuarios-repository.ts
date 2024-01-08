import { Prisma, Usuario } from '@prisma/client'

import { UsuariosRepository } from '../usuarios-repository'

interface UsuarioRequest {
  nome: string
  email: string
  senha: string
  nivel: string
  acesso: boolean
}

export class InMemoryUsuariosRepository implements UsuariosRepository {
  public items: Usuario[] = []

  async create(data: UsuarioRequest) {
    const usuario = {
      nome: data.nome,
      email: data.email,
      senha: data.senha,
      nivel: data.nivel,
      acesso: data.acesso,
    }

    this.items.push(usuario)

    return usuario
  }

  async findByEmail(email: string) {
    const usuario = this.items.find((item) => item.email === email)

    if (!usuario) {
      return null
    }
    return usuario
  }
}
