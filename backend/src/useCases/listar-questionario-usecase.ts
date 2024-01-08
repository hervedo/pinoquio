import { QuestionariosRepository } from '@/repositories/questionarios-repository'
import { Questionario } from '@prisma/client'

interface ListarQuestionarioUseCaseRequest {
  id: string
}

interface ListarQuestionarioUseCaseResponse {
  questionario: Questionario
}

export class ListarQuestionarioUseCase {
  constructor(private questionariosRepository: QuestionariosRepository) {}

  async execute({
    id,
  }: ListarQuestionarioUseCaseRequest): Promise<ListarQuestionarioUseCaseResponse> {
    const questionario = await this.questionariosRepository.findById(id)

    if (!questionario) {
      throw new Error('Questionario não encontrado')
    }

    return { questionario }
  }
}
