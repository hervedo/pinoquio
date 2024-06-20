import { Realm } from "@realm/react"

type GenerateProps = {
    respostas: string
    latitude: number
    longitude: number
}

export class Respostas extends Realm.Object<Respostas> {
    _id!: string;
    respostas!: string
    latitude!: number
    longitude!: number
    created_at!: string


    static generate({ respostas, latitude, longitude }: GenerateProps) {
        return {
            _id: new Realm.BSON.UUID(),
            respostas,
            latitude,
            longitude,
            created_at: new Date(),
            updated_at: new Date()
        }

    }

    static schema = {
        name: 'Respostas',
        primaryKey: '_id',

        properties: {
            _id: 'uuid',
            respostas: 'string',
            latitude: 'number',
            longitude: 'number',
            created_at: 'date',
            updated_at: 'date'
        }

    }
}