import { Prisma, Questionario } from '@prisma/client'

export interface QuestionariosRepository {
  create(data: Prisma.QuestionarioCreateInput): Promise<Questionario>

  findAll(): Promise<Questionario[]>
  findById(id: string): Promise<Questionario | null>
}
