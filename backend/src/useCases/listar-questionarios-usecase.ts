import { QuestionariosRepository } from '@/repositories/questionarios-repository'

export class ListarQuestionariosUseCase {
  constructor(private questionariosRepository: QuestionariosRepository) {}

  async execute() {
    const questionarios = await this.questionariosRepository.findAll()

    return questionarios
  }
}
