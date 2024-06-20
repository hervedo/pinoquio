import { createRealmContext } from '@realm/react'
import { Questionario } from './schemas/Questionario'

export const { RealmProvider, useRealm, useQuery, useObject } = createRealmContext({
    schema: [Questionario]
})