import { UsuariosRepository } from '@/repositories/usuarios-repository'

export class ListarUsuariosUseCase {
  constructor(private usuariosRepository: UsuariosRepository) {}

  async execute() {
    const usuarios = this.usuariosRepository.findAll()

    return usuarios
  }
}
