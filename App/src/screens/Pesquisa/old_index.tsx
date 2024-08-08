
import { useEffect, useState } from "react";
import { Alert, FlatList } from "react-native";
import { useUser } from "@realm/react";
import { LocationAccuracy, useForegroundPermissions, watchPositionAsync, LocationSubscription } from "expo-location"


import { Container, Message, Mostrar, Pergunta, RespostaView, Rodape, Text } from "./styles";

import { getAddressLocation } from "../../utils/getAddressLocation";
import { Button } from "../../components/Button";
import { useQuery, useRealm } from "../../libs/realm";
import { Respostas } from "../../libs/realm/schemas/Respostas";
import { Questionario } from "../../libs/realm/schemas/Questionario";
import { useNavigation } from "@react-navigation/native";
import { Encerrar } from "../../components/Encerrar";
import { Resposta } from "../../components/Resposta";


type IQuestionario = {
    pergunta: string
    respostas: string[]
}


type ICoordenadas = {
    altitude: number | null
    latitude: number
    longitude: number
}


export function Pesquisa() {
    

    const [coordenada, setCoordenada] = useState<ICoordenadas>({ altitude: 0, longitude: 0, latitude: 0 })
    const [registrando, setRegistrando] = useState(false)
    const [locationForegroundPermission, requestLocationForegroundPermission] = useForegroundPermissions()
    const [perguntas, setPerguntas] = useState('')
    const [respostas, setRespostas] = useState('')

    let questionario = []


    const realm = useRealm()
    const user = useUser()

    const {goBack} = useNavigation()

    
    const questionarioDB = useQuery(Questionario).filtered('ativa="S"')


    function handleResposta( pergunta: string, resposta: string) {
        let separador = ""
        if(perguntas!=""){
          separador = " , " 

        }

        setPerguntas(perguntas+separador+pergunta) 
        setRespostas(respostas+separador+resposta) 

        console.log(setPerguntas)
        console.log(setRespostas)
     
    }

    function handleCancelar() {
        goBack()
    }


    function handleSalvar() {

        if(!coordenada?.latitude && !coordenada?.longitude){
            return Alert.alert('Erro', 'Não foi possível obter os dados')
        }



        try {
            setRegistrando(true)
            
            console.log('Gravando')
            console.log(`USER : ${user.id} - ${user.deviceId}`)
            console.log(coordenada.latitude)
            console.log(coordenada.longitude)
            console.log(perguntas)
            console.log(respostas)


            //perguntas,
            realm.write(() => {
                realm.create('Respostas', Respostas.generate({
                    
                    respostas,
                    latitude: coordenada.latitude,
                    longitude: coordenada.longitude
                }))
            })


            Alert.alert('Resposta', 'Resposta registrada com sucesso!')
            setRegistrando(false)
            setPerguntas("")
            setRespostas("")
            goBack()


        } catch (error) {
            Alert.alert('Erro', 'Não foi possível registrar a resposta')
            setRegistrando(false)

        }


    }

    function handleItem(recebe) {
        const respostasBT = recebe.respostas.replaceAll("{","").replaceAll("}","").replaceAll(' ,',"").replaceAll('"',"").split(",")
        console.log(respostasBT.length)
        return(
            <>
                <Pergunta>{recebe.pergunta}</Pergunta>
                <RespostaView>
                {               
                    respostasBT.map((item) => 
                    <Resposta idResposta={recebe.pergunta+item} resposta={item} onPress={() => handleResposta(recebe.pergunta, item)}/>
                    )
                }

                </RespostaView>
                
                 
            </>
            
            
        )

    }
    

    useEffect(() => {

        if (!locationForegroundPermission?.granted) {
            return
        }

        let subscription: LocationSubscription

        watchPositionAsync({
            accuracy: LocationAccuracy.High,
            timeInterval: 1000
        }, (location) => {
            getAddressLocation(location.coords)
                .then((address) => {
                    console.log("Altitude:" + location.coords.altitude + "latitude:" + location.coords.latitude + "longitude:" + location.coords.longitude)
                    console.log(address)
                })
            setCoordenada({ altitude: location.coords.altitude, latitude: location.coords.latitude, longitude: location.coords.longitude })
        }).then((response) => subscription = response)

        return () => {
            if(subscription)
            {subscription.remove()}
        }

    }, [locationForegroundPermission])

    useEffect(() => {
        realm.subscriptions.update((mutableSubs, realm) => {
       
         const respostasQuery = realm.objects('Respostas')
         mutableSubs.add(respostasQuery, {name: 'respostas_atualiza'})

         const questionarioQuery = realm.objects('Questionario')
         mutableSubs.add(questionarioQuery, {name: 'questionario_atualiza'})
        })

        
    },[realm])


    useEffect(() => {
    
        requestLocationForegroundPermission()
        console.log("LOCAL")
        


/*
            setQuestionarios(
                [{ idPergunta: "P000001", pergunta: "Qual sua idade?", respostas: [{ idResposta: "R00001", resposta: "15-20",  }, { idResposta: "R00002", resposta: "21-25" }] },
                { idPergunta: "P000002", pergunta: "Qual sua formação?", respostas: [{ idResposta: "R00003", resposta: "Superior incompleto" }, { idResposta: "R00004", resposta: "Superior Completo" }] },
                { idPergunta: "P000003", pergunta: "Em quem você votaria para Prefeito?", respostas: [{ idResposta: "R00005", resposta: "Sandro" }, { idResposta: "R00006", resposta: "Jorginho" }, { idResposta: "R00007", resposta: "Vilço Medeiros" }, { idResposta: "R00008", resposta: "Carelli" }, { idResposta: "R00009", resposta: "Rosinha" }] },
                { idPergunta: "P000004", pergunta: "Em quem você NÃO votaria para Prefeito?", respostas: [{ idResposta: "R00010", resposta: "Sandro" }, { idResposta: "R00011", resposta: "Jorginho" }, { idResposta: "R00012", resposta: "Vilço Medeiros" }, { idResposta: "R00013", resposta: "Carelli" }, { idResposta: "R00014", resposta: "Rosinha" }] },
                { idPergunta: "P000005", pergunta: "Qual deveria ser a prioridade do próximo prefeito?", respostas: [{ idResposta: "R00015", resposta: "Trânsito" }, { idResposta: "R00016", resposta: "Educação" }, { idResposta: "R00017", resposta: "Saúde" }, { idResposta: "R00018", resposta: "Cultura" }, { idResposta: "R00019", resposta: "Auxilio a Empresas" }] }
                ]
            )

            realm.write(() => {
                realm.create('Questionario', Questionario.generate({
                    pergunta: "Qual sua idade?",
                    respostas: '{"15-25","26-40", "41-60", "60-xx"}',
                    ativa: 'S'                    
                }))
                realm.create('Questionario', Questionario.generate({
                    pergunta: "Qual sua formação?",
                    respostas: '{"Sem Estudo", "Ensino Básico", "Ensino Fundamental","Ensino Médio" ,"Superior"}',
                    ativa: 'S'                    
                }))
                
                realm.create('Questionario', Questionario.generate({
                    pergunta: "Em quem você votaria para Prefeito?",
                    respostas: '{"Medeiros/Jorge", "Carelli/Balestrin", "Fabiano Ribeiro/Anicelso"}',
                    ativa: 'S'                    
                }))

                realm.create('Questionario', Questionario.generate({
                    pergunta: "Em quem você não votaria para Prefeito?",
                    respostas: '{"Medeiros/Jorge", "Carelli/Balestrin", "Fabiano Ribeiro/Anicelso"}',
                    ativa: 'S'                    
                }))

                realm.create('Questionario', Questionario.generate({
                    pergunta: "Qual deveria ser a prioridade do próximo prefeito?",
                    respostas: '{"Saúde", "Educação", "Trânsito", "Cultura", "Agricultura","Empresas"}',
                    ativa: 'S'                    
                }))


            })
*/
    }, [])

   


if (!locationForegroundPermission?.granted) {
    return (
        <Container>
            <Message>
                Permissão da localização negada.
                Favor conceder a permissão para localização nas configurações do seu dispositivo
            </Message>
        </Container>
    )
}

    return (
        <Container>
            <Message>Pinóquio - Questionário</Message>

            
            {
                questionarioDB.length > 0 &&
                questionarioDB.map((item) => 
                     handleItem(item)
                )
                
            }


<Rodape>
            <Button key="BR" title="Registrar Resposta" onPress={handleSalvar} isLoading={registrando} />
            <Encerrar key="BC" title="Cancelar" onPress={handleCancelar} isLoading={registrando} />

</Rodape>


        </Container >



    )
}


