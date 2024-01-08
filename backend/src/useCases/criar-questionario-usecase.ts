import { QuestionariosRepository } from '@/repositories/questionarios-repository'

interface QuestionarioRequest {
  nome: string
  perguntas: string
  usuarioId: string
}

export class CriarQuestionarioUseCase {
  constructor(private questionariosRepository: QuestionariosRepository) {}

  async execute({ nome, perguntas, usuarioId }: QuestionarioRequest) {
    const questionario = await this.questionariosRepository.create({
      nome,
      perguntas,
      usuarioId,
    })

    return questionario
  }
}
