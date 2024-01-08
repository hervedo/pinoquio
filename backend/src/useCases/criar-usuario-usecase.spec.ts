import { describe, it, expect } from 'vitest'
import { CriarUsuarioUseCase } from './criar-usuario-usecase'
import { InMemoryUsuariosRepository } from '@/repositories/in-memory/in-memory-usuarios-repository'
import { compare } from 'bcryptjs'

describe('Criar Usuário Use Case', () => {
  it('A senha do usuário precisa ser criptografada', async () => {
    const usuariosRepository = new InMemoryUsuariosRepository()
    const criarUsuarioUseCase = new CriarUsuarioUseCase(usuariosRepository)

    const usuario = await criarUsuarioUseCase.execute({
      nome: 'John Doe',
      email: 'johndoe@example.com',
      senha: '123456',
      nivel: 'admin',
      acesso: true,
    })

    const senhaEstaCriptografada = await compare('123456', usuario.senha)

    expect(senhaEstaCriptografada).toBe(true)
  })
})
