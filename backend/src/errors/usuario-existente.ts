export class UsuarioExistente extends Error {
  constructor() {
    super('Usuário já existente!')
  }
}
