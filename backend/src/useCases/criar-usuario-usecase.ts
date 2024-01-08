import { UsuarioExistente } from '@/errors/usuario-existente'
import { UsuariosRepository } from '@/repositories/usuarios-repository'
import { hash } from 'bcryptjs'

interface UsuarioRequest {
  nome: string
  email: string
  senha: string
  nivel: string
  acesso: boolean
}

export class CriarUsuarioUseCase {
  constructor(private usuariosRepository: UsuariosRepository) {}

  async execute({ nome, email, senha, nivel, acesso }: UsuarioRequest) {
    const emailExistente = await this.usuariosRepository.findByEmail(email)

    if (emailExistente) {
      throw new UsuarioExistente()
    }

    const senhaHash = await hash(senha, 6)

    const usuario = await this.usuariosRepository.create({
      nome,
      email,
      senha: senhaHash,
      nivel,
      acesso,
    })

    return usuario
  }
}
