import { Realm } from "@realm/react"

type GenerateProps = {
    pergunta: string
    respostas: string
    ativa: string
}

export class Questionario extends Realm.Object<Questionario> {
    _id!: string;
    pergunta!: string
    respostas!: string
    ativa!: string
    created_at!: string
    update_at!: string


    static generate({ pergunta, respostas, ativa }: GenerateProps) {
        return {
            _id: new Realm.BSON.UUID(),
            pergunta,
            respostas,
            ativa: 'S',
            created_at: new Date(),
            updated_at: new Date()


        }

    }

    static schema = {
        name: 'Questionario',
        primaryKey: '_id',

        properties: {
            _id: 'uuid',
            pergunta: 'string',
            respostas: 'string',
            ativa: 'string',
            created_at: 'date',
            updated_at: 'date'
        }

    }
}