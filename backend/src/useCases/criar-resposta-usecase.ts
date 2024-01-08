import { RespostasRepository } from '@/repositories/respostas-respository'

interface RespostasRequest {
  questionarioId: string
  respostas: string
  latitude: number
  longitude: number
  usuarioId: string
}

export class CriarRespostaUseCase {
  constructor(private respostasRepository: RespostasRepository) {}

  async execute({
    questionarioId,
    respostas,
    latitude,
    longitude,
    usuarioId,
  }: RespostasRequest) {
    console.log(questionarioId)

    const resposta = this.respostasRepository.create({
      questionarioId,
      respostas,
      latitude,
      longitude,
      usuarioId,
    })

    return resposta
  }
}
