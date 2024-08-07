import Realm from 'realm'
import { createRealmContext } from '@realm/react'
import { Questionario } from './schemas/Questionario'
import { Respostas } from './schemas/Respostas'


const realmAccessBehavior: Realm.OpenRealmBehaviorConfiguration = {
    type: Realm.OpenRealmBehaviorType.OpenImmediately
}

export const syncConfig: any = {
    flexible: true,
    newRealmFileBehavior: realmAccessBehavior,
    existingRealmFileBehavior: realmAccessBehavior
}


export const { RealmProvider, useRealm, useQuery, useObject } = createRealmContext({
    schema: [Questionario, Respostas]
})