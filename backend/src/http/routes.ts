import { FastifyInstance } from 'fastify'
import { CriarUsuarioController } from './controllers/criar-usuario-controller'
import { ListarUsuariosController } from './controllers/listar-usuarios-controller'
import { CriarQuestionarioController } from './controllers/criar-questionario-controller'
import { ListarQuestionariosController } from './controllers/listar-questionarios-controller'
import { ListarQuestionarioController } from './controllers/listar-questionario-controller'
import { CriarRespostaController } from './controllers/criar-resposta-controller'
import { ListarRespostasController } from './controllers/listar-respostas-controller'

export async function appRoutes(app: FastifyInstance) {
  console.log('Entrou no AppRoutes')
  app.post('/usuario', CriarUsuarioController)

  app.get('/usuarios', ListarUsuariosController)

  app.post('/questionario', CriarQuestionarioController)
  app.get('/questionarios', ListarQuestionariosController)
  app.get('/questionario/:id', ListarQuestionarioController)

  app.post('/resposta', CriarRespostaController)
  app.get('/respostas', ListarRespostasController)
}
